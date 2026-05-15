"use strict";

const readline = require("readline");
const chalk = require("chalk");

const { getAllCourses, getCourseById } = require("./courses");
const { enrollLearner, getLearnerEnrollments, getEnrollmentRecord } = require("./enroll");
const { markLessonComplete, getProgressSummary } = require("./progress");
const { withdrawFromCourse } = require("./withdraw");
const { setLearner, getLearner, getSessionDuration } = require("./user");
const lmsEvents = require("./events");
const {
  validateLearnerName,
  validateMenuChoice,
  validateCourseSelection,
  validateLessonSelection,
  withRetry,
  MAX_RETRIES,
} = require("./validator");
const {
  displayMainMenu,
  displayCourseList,
  displayCourseDetails,
  displayEnrolledCourses,
  displayLessonList,
  displayProgressSummary,
  divider,
  header,
} = require("./utils");

// ─── Readline Interface ───────────────────────────────────────────────────────
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Promisify readline question
 * @param {string} prompt
 * @returns {Promise<string>}
 */
function ask(prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

// ─── Startup Banner ──────────────────────────────────────────────────────────
function showBanner() {
  console.clear();
  console.log(chalk.cyan.bold("  ╔═══════════════════════════════════════════════════════╗"));
  console.log(chalk.cyan.bold("  ║           📚  CLI LEARNING MANAGEMENT SYSTEM          ║"));
  console.log(chalk.cyan.bold("  ║                  Node.js LMS  v1.0.0                  ║"));
  console.log(chalk.cyan.bold("  ╚═══════════════════════════════════════════════════════╝"));
  console.log(chalk.dim("  Powered by Node.js  |  EventEmitter  |  Chalk  |  Promises"));
}

// ─── Learner Login Flow ───────────────────────────────────────────────────────
async function loginFlow() {
  return new Promise((resolve) => {
    let attempts = MAX_RETRIES;

    function attempt() {
      ask(chalk.cyan("\n  Enter your name to begin: ")).then((input) => {
        validateLearnerName(input, (err, name) => {
          if (err) {
            console.log(chalk.red(`  ⚠  ${err.message}`));
            attempts--;
            if (attempts <= 0) {
              console.log(chalk.red.bold("  ❌ Too many failed attempts. Exiting."));
              rl.close();
              process.exit(1);
            }
            console.log(chalk.yellow(`  ↺  ${attempts} attempt(s) remaining.`));
            attempt();
          } else {
            setLearner(name);
            const learner = getLearner();
            lmsEvents.emit("sessionStarted", { learnerName: learner.name });
            resolve(learner);
          }
        });
      });
    }

    attempt();
  });
}

// ─── Menu Option Handlers ─────────────────────────────────────────────────────

// 1. View all courses
async function handleViewAllCourses() {
  displayCourseList(getAllCourses());
  await ask(chalk.dim("  Press Enter to return to menu..."));
}

// 2. View course details
async function handleViewCourseDetails() {
  const courses = getAllCourses();
  displayCourseList(courses);

  return new Promise((resolve) => {
    withRetry(
      () => ask(chalk.cyan("\n  Enter Course ID to view details: ")),
      validateCourseSelection,
      async (course) => {
        lmsEvents.emit("courseViewed", { courseTitle: course.title });
        displayCourseDetails(course);
        await ask(chalk.dim("  Press Enter to return to menu..."));
        resolve();
      },
      resolve,
      MAX_RETRIES,
      courses
    );
  });
}

// 3. Enroll in a course
async function handleEnroll(learnerName) {
  const courses = getAllCourses();
  displayCourseList(courses);

  return new Promise((resolve) => {
    withRetry(
      () => ask(chalk.cyan("\n  Enter Course ID to enroll: ")),
      validateCourseSelection,
      async (course) => {
        try {
          await enrollLearner(learnerName, course.id);
        } catch (err) {
          // event already emitted inside enrollLearner
        }
        await ask(chalk.dim("  Press Enter to return to menu..."));
        resolve();
      },
      resolve,
      MAX_RETRIES,
      courses
    );
  });
}

// 4. View enrolled courses
async function handleViewEnrolled(learnerName) {
  const enrollments = getLearnerEnrollments(learnerName);
  displayEnrolledCourses(enrollments, learnerName);
  await ask(chalk.dim("  Press Enter to return to menu..."));
}

// 5. Mark a lesson as completed
async function handleMarkLesson(learnerName) {
  const enrollments = getLearnerEnrollments(learnerName);

  if (enrollments.length === 0) {
    console.log(chalk.yellow("\n  ⚠  You are not enrolled in any courses yet."));
    await ask(chalk.dim("  Press Enter to return to menu..."));
    return;
  }

  header("📝  Mark Lesson as Completed");
  console.log(chalk.cyan("  Your enrolled courses:\n"));
  enrollments.forEach((e, i) => {
    console.log(`  ${chalk.cyan(`${i + 1}.`)} ${e.courseTitle} ${chalk.dim(`(${e.progressPercentage}% complete)`)}`);
  });

  const courseInput = await ask(chalk.cyan("\n  Enter Course ID: "));
  const trimmedCourse = courseInput.trim().toUpperCase();
  const record = getEnrollmentRecord(learnerName, trimmedCourse);

  if (!record) {
    console.log(chalk.red(`\n  ❌ You are not enrolled in "${courseInput.trim()}".`));
    lmsEvents.emit("operationFailed", {
      operation: "Mark Lesson Complete",
      reason: `Not enrolled in "${courseInput.trim()}"`,
    });
    await ask(chalk.dim("  Press Enter to return to menu..."));
    return;
  }

  displayLessonList(record);

  return new Promise((resolve) => {
    withRetry(
      () => ask(chalk.cyan("  Enter lesson number to mark as completed: ")),
      validateLessonSelection,
      async (lessonIndex) => {
        try {
          await markLessonComplete(learnerName, trimmedCourse, lessonIndex);
        } catch (err) {
          // event already emitted inside markLessonComplete
        }
        await ask(chalk.dim("  Press Enter to return to menu..."));
        resolve();
      },
      resolve,
      MAX_RETRIES,
      record.totalLessons
    );
  });
}

// 6. View progress
async function handleViewProgress(learnerName) {
  const enrollments = getLearnerEnrollments(learnerName);

  if (enrollments.length === 0) {
    console.log(chalk.yellow("\n  ⚠  You have no enrolled courses to track progress for."));
    await ask(chalk.dim("  Press Enter to return to menu..."));
    return;
  }

  header("📊  View Course Progress");
  console.log(chalk.cyan("  Your enrolled courses:\n"));
  enrollments.forEach((e, i) => {
    console.log(`  ${chalk.cyan(`${i + 1}.`)} ${e.courseTitle}`);
  });

  return new Promise((resolve) => {
    withRetry(
      () => ask(chalk.cyan("\n  Enter Course ID to view progress: ")),
      validateCourseSelection,
      async (course) => {
        // Check if enrolled
        const record = getEnrollmentRecord(learnerName, course.id);
        if (!record) {
          console.log(chalk.red(`\n  ❌ You are not enrolled in "${course.title}".`));
          await ask(chalk.dim("  Press Enter to return to menu..."));
          return resolve();
        }
        try {
          const summary = await getProgressSummary(learnerName, course.id);
          displayProgressSummary(summary);
        } catch (err) {
          // handled inside getProgressSummary
        }
        await ask(chalk.dim("  Press Enter to return to menu..."));
        resolve();
      },
      resolve,
      MAX_RETRIES,
      getAllCourses()
    );
  });
}

// 7. Withdraw from course
async function handleWithdraw(learnerName) {
  const enrollments = getLearnerEnrollments(learnerName);

  if (enrollments.length === 0) {
    console.log(chalk.yellow("\n  ⚠  You have no enrolled courses to withdraw from."));
    await ask(chalk.dim("  Press Enter to return to menu..."));
    return;
  }

  header("↩  Withdraw from a Course");
  console.log(chalk.cyan("  Your enrolled courses:\n"));
  enrollments.forEach((e, i) => {
    console.log(`  ${chalk.cyan(`${i + 1}.`)} ${e.courseTitle} ${chalk.dim(`(${e.courseId})`)}`);
  });

  return new Promise((resolve) => {
    withRetry(
      () => ask(chalk.cyan("\n  Enter Course ID to withdraw from: ")),
      validateCourseSelection,
      async (course) => {
        const record = getEnrollmentRecord(learnerName, course.id);
        if (!record) {
          console.log(chalk.red(`\n  ❌ You are not enrolled in "${course.title}".`));
          await ask(chalk.dim("  Press Enter to return to menu..."));
          return resolve();
        }

        // Confirm before withdrawing
        const confirm = await ask(
          chalk.yellow(
            `\n  ⚠  Are you sure you want to withdraw from "${course.title}"? (yes/no): `
          )
        );
        if (confirm.trim().toLowerCase() !== "yes") {
          console.log(chalk.dim("  Withdrawal cancelled."));
          await ask(chalk.dim("  Press Enter to return to menu..."));
          return resolve();
        }

        try {
          const details = await withdrawFromCourse(learnerName, course.id);
          console.log(
            chalk.dim(
              `\n  Progress at withdrawal: ${details.completedLessons}/${details.totalLessons} lessons (${details.progressAtWithdrawal}%)`
            )
          );
        } catch (err) {
          // handled inside withdrawFromCourse
        }
        await ask(chalk.dim("  Press Enter to return to menu..."));
        resolve();
      },
      resolve,
      MAX_RETRIES,
      getAllCourses()
    );
  });
}

// ─── Main Application Loop ───────────────────────────────────────────────────
async function main() {
  showBanner();

  // Login
  const learner = await loginFlow();

  let running = true;

  while (running) {
    displayMainMenu(learner.name);
    const choiceInput = await ask(chalk.cyan("  Enter your choice (1-8): "));

    await new Promise((resolve) => {
      validateMenuChoice(choiceInput, 1, 8, async (err, choice) => {
        if (err) {
          console.log(chalk.red(`\n  ⚠  ${err.message}`));
          await ask(chalk.dim("  Press Enter to continue..."));
          return resolve();
        }

        switch (choice) {
          case 1:
            await handleViewAllCourses();
            break;
          case 2:
            await handleViewCourseDetails();
            break;
          case 3:
            await handleEnroll(learner.name);
            break;
          case 4:
            await handleViewEnrolled(learner.name);
            break;
          case 5:
            await handleMarkLesson(learner.name);
            break;
          case 6:
            await handleViewProgress(learner.name);
            break;
          case 7:
            await handleWithdraw(learner.name);
            break;
          case 8:
            running = false;
            break;
        }
        resolve();
      });
    });
  }

  // Exit
  divider("═");
  console.log(chalk.cyan.bold(`\n  👋 Goodbye, ${learner.name}!`));
  console.log(chalk.dim(`  Session Duration : ${getSessionDuration()}`));
  console.log(chalk.dim(`  Courses Enrolled : ${getLearnerEnrollments(learner.name).length}`));
  divider("═");
  console.log();
  rl.close();
}

// ─── Launch ──────────────────────────────────────────────────────────────────
main().catch((err) => {
  console.error(chalk.red.bold("\n  Fatal Error: " + err.message));
  rl.close();
  process.exit(1);
});
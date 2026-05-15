"use strict";

const chalk = require("chalk");

/**
 * Print a section divider
 */
function divider(char = "─", length = 55) {
  console.log(chalk.dim("  " + char.repeat(length)));
}

/**
 * Print a blank line
 */
function blank() {
  console.log();
}

/**
 * Print a header box
 * @param {string} title
 */
function header(title) {
  const pad = Math.max(0, Math.floor((53 - title.length) / 2));
  console.log();
  divider("═");
  console.log(chalk.cyan.bold("  " + " ".repeat(pad) + title));
  divider("═");
}

/**
 * Display all available courses in a formatted table
 * @param {Array} courses
 */
function displayCourseList(courses) {
  header("📚  AVAILABLE COURSES");
  const categories = {};
  courses.forEach((c) => {
    if (!categories[c.category]) categories[c.category] = [];
    categories[c.category].push(c);
  });

  for (const [cat, list] of Object.entries(categories)) {
    console.log(chalk.yellow.bold(`\n  ▸ ${cat}`));
    list.forEach((c) => {
      const seats = c.enrollmentLimit - c.enrolled;
      const seatsColor = seats <= 3 ? chalk.red : chalk.green;
      console.log(
        `    ${chalk.cyan.bold(c.id.padEnd(8))} ${chalk.white(c.title.padEnd(38))} ${chalk.dim(c.difficulty.padEnd(12))} ${seatsColor(`${seats} seats`)}`
      );
    });
  }
  divider();
  console.log(chalk.dim("  Use the Course ID (e.g. WD101) when enrolling or viewing details."));
}

/**
 * Display a single course's full details
 * @param {Object} course
 */
function displayCourseDetails(course) {
  header(`📖  ${course.title}`);
  console.log(`  ${chalk.dim("ID          :")} ${chalk.cyan(course.id)}`);
  console.log(`  ${chalk.dim("Instructor  :")} ${chalk.white(course.instructor)}`);
  console.log(`  ${chalk.dim("Category    :")} ${chalk.yellow(course.category)}`);
  console.log(`  ${chalk.dim("Difficulty  :")} ${chalk.magenta(course.difficulty)}`);
  console.log(
    `  ${chalk.dim("Seats Left  :")} ${chalk.green(course.enrollmentLimit - course.enrolled)} / ${course.enrollmentLimit}`
  );
  console.log(`  ${chalk.dim("Description :")} ${chalk.white(course.description)}`);
  console.log(`\n  ${chalk.yellow.bold("Lessons:")}`);
  course.lessons.forEach((l, i) => {
    console.log(`    ${chalk.dim(`${i + 1}.`)} ${l}`);
  });
  divider();
}

/**
 * Display enrolled courses summary for a learner
 * @param {Array} enrollments
 * @param {string} learnerName
 */
function displayEnrolledCourses(enrollments, learnerName) {
  header(`🎒  ${learnerName}'s Enrolled Courses`);
  if (enrollments.length === 0) {
    console.log(chalk.yellow("  You are not enrolled in any courses yet."));
    console.log(chalk.dim("  Use option 3 from the main menu to enroll."));
    divider();
    return;
  }
  enrollments.forEach((e, idx) => {
    const bar = buildProgressBar(e.progressPercentage);
    console.log(
      `\n  ${chalk.cyan.bold(`${idx + 1}.`)} ${chalk.white.bold(e.courseTitle)}`
    );
    console.log(
      `     ${chalk.dim("Progress :")} ${bar} ${chalk.green.bold(e.progressPercentage + "%")}`
    );
    console.log(
      `     ${chalk.dim("Lessons  :")} ${e.completedLessons.length}/${e.totalLessons} completed`
    );
    console.log(
      `     ${chalk.dim("Enrolled :")} ${new Date(e.enrollmentTimestamp).toLocaleDateString()}`
    );
  });
  divider();
}

/**
 * Display detailed progress for a course
 * @param {Object} summary
 */
function displayProgressSummary(summary) {
  header(`📊  Progress: ${summary.courseTitle}`);
  const bar = buildProgressBar(summary.progressPercentage, 30);
  console.log(`  ${chalk.dim("Progress   :")} ${bar} ${chalk.green.bold(summary.progressPercentage + "%")}`);
  console.log(`  ${chalk.dim("Completed  :")} ${summary.completedCount} / ${summary.totalCount} lessons`);
  console.log(`  ${chalk.dim("Enrolled   :")} ${summary.enrolledOn}`);

  if (summary.completedLessons.length > 0) {
    console.log(`\n  ${chalk.green.bold("✓ Completed Lessons:")}`);
    summary.completedLessons.forEach((l) => {
      console.log(`    ${chalk.green("✓")} ${l}`);
    });
  }

  if (summary.pendingLessons.length > 0) {
    console.log(`\n  ${chalk.yellow.bold("○ Pending Lessons:")}`);
    summary.pendingLessons.forEach((l) => {
      console.log(`    ${chalk.dim("○")} ${l}`);
    });
  }

  if (summary.isComplete) {
    console.log(chalk.yellow.bold("\n  🏅 Course Fully Completed! Well done!"));
  }
  divider();
}

/**
 * Display lesson list for an enrolled course
 * @param {Object} record enrollment record
 */
function displayLessonList(record) {
  header(`📝  Lessons: ${record.courseTitle}`);
  record.lessons.forEach((lesson, i) => {
    const done = record.completedLessons.includes(i);
    const marker = done ? chalk.green("✓") : chalk.dim("○");
    const lessonText = done ? chalk.dim(lesson) : chalk.white(lesson);
    console.log(`    ${chalk.cyan(`${i + 1}.`)} ${marker} ${lessonText}`);
  });
  divider();
}

/**
 * Build a text-based progress bar
 * @param {number} percent 0-100
 * @param {number} width
 * @returns {string}
 */
function buildProgressBar(percent, width = 20) {
  const filled = Math.round((percent / 100) * width);
  const empty = width - filled;
  return chalk.green("█".repeat(filled)) + chalk.dim("░".repeat(empty));
}

/**
 * Display the main menu
 * @param {string} learnerName
 */
function displayMainMenu(learnerName) {
  console.log();
  divider("─");
  console.log(chalk.cyan.bold(`  🎓  LMS Main Menu  —  ${chalk.white(learnerName)}`));
  divider("─");
  console.log(`  ${chalk.cyan("1.")} View All Available Courses`);
  console.log(`  ${chalk.cyan("2.")} View Course Details`);
  console.log(`  ${chalk.cyan("3.")} Enroll in a Course`);
  console.log(`  ${chalk.cyan("4.")} View My Enrolled Courses`);
  console.log(`  ${chalk.cyan("5.")} Mark a Lesson as Completed`);
  console.log(`  ${chalk.cyan("6.")} View Progress for a Course`);
  console.log(`  ${chalk.cyan("7.")} Withdraw from a Course`);
  console.log(`  ${chalk.red("8.")} Exit Application`);
  divider("─");
}

module.exports = {
  divider,
  blank,
  header,
  displayCourseList,
  displayCourseDetails,
  displayEnrolledCourses,
  displayProgressSummary,
  displayLessonList,
  displayMainMenu,
  buildProgressBar,
};

"use strict";

const EventEmitter = require("events");
const chalk = require("chalk");

// ─── Custom LMS EventEmitter ──────────────────────────────────────────────────
class LMSEmitter extends EventEmitter {}

const lmsEvents = new LMSEmitter();

// ─── Event Listeners ─────────────────────────────────────────────────────────

lmsEvents.on("sessionStarted", ({ learnerName }) => {
  console.log(
    chalk.cyan.bold(`\n  🎓 Welcome to the LMS, ${learnerName}! Your session has started.`)
  );
  console.log(chalk.dim("  ─────────────────────────────────────────────────────"));
});

lmsEvents.on("courseViewed", ({ courseTitle }) => {
  console.log(chalk.blue(`\n  👁  Viewing details for: ${chalk.bold(courseTitle)}`));
});

lmsEvents.on("enrollmentStarted", ({ courseTitle }) => {
  console.log(chalk.yellow(`\n  ⏳ Processing enrollment for: ${chalk.bold(courseTitle)}...`));
});

lmsEvents.on("enrollmentConfirmed", ({ learnerName, courseTitle, timestamp }) => {
  console.log(chalk.green.bold(`\n  ✅ Enrollment Confirmed!`));
  console.log(chalk.green(`     Learner  : ${learnerName}`));
  console.log(chalk.green(`     Course   : ${courseTitle}`));
  console.log(chalk.green(`     Date     : ${new Date(timestamp).toLocaleString()}`));
});

lmsEvents.on("lessonCompleted", ({ lessonTitle, courseTitle, progress }) => {
  console.log(chalk.green.bold(`\n  🏆 Lesson Completed: "${lessonTitle}"`));
  console.log(chalk.green(`     Course   : ${courseTitle}`));
  console.log(chalk.green(`     Progress : ${progress}%`));
  if (progress === 100) {
    console.log(
      chalk.yellow.bold(`\n  🎉 Congratulations! You have completed "${courseTitle}"!`)
    );
  }
});

lmsEvents.on("progressViewed", ({ courseTitle, progress }) => {
  console.log(
    chalk.blue(`\n  📊 Progress check for "${chalk.bold(courseTitle)}": ${progress}%`)
  );
});

lmsEvents.on("courseWithdrawn", ({ learnerName, courseTitle }) => {
  console.log(chalk.yellow.bold(`\n  ↩  Withdrawal Processed`));
  console.log(chalk.yellow(`     Learner  : ${learnerName}`));
  console.log(chalk.yellow(`     Course   : ${courseTitle} — removed from your enrollments.`));
});

lmsEvents.on("operationFailed", ({ operation, reason }) => {
  console.log(chalk.red.bold(`\n  ❌ Operation Failed: ${operation}`));
  console.log(chalk.red(`     Reason   : ${reason}`));
});

module.exports = lmsEvents;

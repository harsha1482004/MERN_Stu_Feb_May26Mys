"use strict";

const chalk = require("chalk");
const { getEnrollmentRecord } = require("./enroll");
const lmsEvents = require("./events");

/**
 * STAGE 1 (Promise): Validate that the learner is enrolled in the course
 * @param {string} learnerName
 * @param {string} courseId
 * @returns {Promise<Object>} enrollment record
 */
function validateEnrolledCourse(learnerName, courseId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const record = getEnrollmentRecord(learnerName, courseId);
      if (!record) {
        reject(
          new Error(`You are not enrolled in course "${courseId}". Please enroll first.`)
        );
      } else {
        resolve(record);
      }
    }, 100);
  });
}

/**
 * STAGE 2 (Promise): Validate the lesson index
 * @param {Object} record
 * @param {number} lessonIndex (0-based)
 * @returns {Promise<{record, lessonIndex}>}
 */
function validateLesson(record, lessonIndex) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (lessonIndex < 0 || lessonIndex >= record.lessons.length) {
        reject(
          new Error(
            `Lesson number ${lessonIndex + 1} is invalid. Course has ${record.lessons.length} lessons.`
          )
        );
      } else {
        resolve({ record, lessonIndex });
      }
    }, 100);
  });
}

/**
 * STAGE 3 (Promise): Check for duplicate lesson completion
 * @param {Object} record
 * @param {number} lessonIndex
 * @returns {Promise<{record, lessonIndex}>}
 */
function checkDuplicateCompletion(record, lessonIndex) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (record.completedLessons.includes(lessonIndex)) {
        reject(
          new Error(
            `Lesson "${record.lessons[lessonIndex]}" has already been marked as completed.`
          )
        );
      } else {
        resolve({ record, lessonIndex });
      }
    }, 100);
  });
}

/**
 * STAGE 4 (Promise): Update the progress record
 * @param {Object} record
 * @param {number} lessonIndex
 * @returns {Promise<Object>} updated record
 */
function updateProgress(record, lessonIndex) {
  return new Promise((resolve) => {
    setTimeout(() => {
      record.completedLessons.push(lessonIndex);
      record.progressPercentage = Math.round(
        (record.completedLessons.length / record.totalLessons) * 100
      );
      resolve(record);
    }, 150);
  });
}

/**
 * STAGE 5 (Promise): Generate a progress summary
 * @param {Object} record
 * @returns {Promise<Object>} summary object
 */
function generateProgressSummary(record) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const completedTitles = record.completedLessons.map((i) => record.lessons[i]);
      const pendingLessons = record.lessons.filter(
        (_, i) => !record.completedLessons.includes(i)
      );
      resolve({
        record,
        summary: {
          courseTitle: record.courseTitle,
          completedCount: record.completedLessons.length,
          totalCount: record.totalLessons,
          progressPercentage: record.progressPercentage,
          completedLessons: completedTitles,
          pendingLessons,
          isComplete: record.progressPercentage === 100,
        },
      });
    }, 100);
  });
}

/**
 * STAGE 6 (async/await): Confirm lesson completion
 * @param {Object} summary
 * @param {string} lessonTitle
 * @returns {Promise<Object>}
 */
async function confirmLessonCompletion({ record, summary }, lessonTitle) {
  lmsEvents.emit("lessonCompleted", {
    lessonTitle,
    courseTitle: record.courseTitle,
    progress: record.progressPercentage,
  });
  return summary;
}

/**
 * Full lesson completion workflow — Promise chaining + async/await
 * @param {string} learnerName
 * @param {string} courseId
 * @param {number} lessonIndex (0-based)
 * @returns {Promise<Object>} progress summary
 */
async function markLessonComplete(learnerName, courseId, lessonIndex) {
  try {
    // Stages 1-4: validate & update (Promise chaining)
    const summaryData = await validateEnrolledCourse(learnerName, courseId)
      .then((record) => validateLesson(record, lessonIndex))
      .then(({ record, lessonIndex: li }) => checkDuplicateCompletion(record, li))
      .then(({ record, lessonIndex: li }) => updateProgress(record, li))
      .then((record) => generateProgressSummary(record));

    const lessonTitle = summaryData.record.lessons[lessonIndex];

    // Stage 6: confirm (async/await)
    const summary = await confirmLessonCompletion(summaryData, lessonTitle);
    return summary;
  } catch (err) {
    lmsEvents.emit("operationFailed", { operation: "Mark Lesson Complete", reason: err.message });
    throw err;
  }
}

/**
 * Get progress summary for an enrolled course
 * @param {string} learnerName
 * @param {string} courseId
 * @returns {Promise<Object>}
 */
async function getProgressSummary(learnerName, courseId) {
  try {
    const record = getEnrollmentRecord(learnerName, courseId);
    if (!record) {
      throw new Error(`You are not enrolled in "${courseId}".`);
    }

    const completedTitles = record.completedLessons.map((i) => record.lessons[i]);
    const pendingLessons = record.lessons.filter(
      (_, i) => !record.completedLessons.includes(i)
    );

    const summary = {
      courseTitle: record.courseTitle,
      instructor: record.instructor,
      completedCount: record.completedLessons.length,
      totalCount: record.totalLessons,
      progressPercentage: record.progressPercentage,
      completedLessons: completedTitles,
      pendingLessons,
      enrolledOn: new Date(record.enrollmentTimestamp).toLocaleString(),
      isComplete: record.progressPercentage === 100,
    };

    lmsEvents.emit("progressViewed", {
      courseTitle: record.courseTitle,
      progress: record.progressPercentage,
    });

    return summary;
  } catch (err) {
    lmsEvents.emit("operationFailed", { operation: "View Progress", reason: err.message });
    throw err;
  }
}

module.exports = {
  markLessonComplete,
  getProgressSummary,
};

"use strict";

const chalk = require("chalk");
const { getEnrollmentRecord, removeEnrollment } = require("./enroll");
const { decrementEnrollment } = require("./courses");
const lmsEvents = require("./events");

/**
 * STAGE 1 (Promise): Confirm the learner is enrolled in the course
 * @param {string} learnerName
 * @param {string} courseId
 * @returns {Promise<Object>} enrollment record
 */
function verifyEnrollmentForWithdrawal(learnerName, courseId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const record = getEnrollmentRecord(learnerName, courseId);
      if (!record) {
        reject(
          new Error(`You are not enrolled in "${courseId}". Cannot withdraw from a course you haven't joined.`)
        );
      } else {
        resolve(record);
      }
    }, 100);
  });
}

/**
 * STAGE 2 (Promise): Remove the enrollment record
 * @param {Object} record
 * @returns {Promise<Object>} removed record details
 */
function processWithdrawal(record) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const removed = removeEnrollment(record.learnerName, record.courseId);
      if (!removed) {
        reject(new Error("Withdrawal failed due to an internal error. Please try again."));
      } else {
        decrementEnrollment(record.courseId);
        resolve({
          learnerName: record.learnerName,
          courseId: record.courseId,
          courseTitle: record.courseTitle,
          completedLessons: record.completedLessons.length,
          totalLessons: record.totalLessons,
          progressAtWithdrawal: record.progressPercentage,
        });
      }
    }, 150);
  });
}

/**
 * STAGE 3 (async/await): Confirm and emit withdrawal event
 * @param {Object} withdrawalDetails
 * @returns {Promise<Object>}
 */
async function confirmWithdrawal(withdrawalDetails) {
  lmsEvents.emit("courseWithdrawn", {
    learnerName: withdrawalDetails.learnerName,
    courseTitle: withdrawalDetails.courseTitle,
  });
  return withdrawalDetails;
}

/**
 * Full withdrawal workflow — Promise chaining + async/await
 * @param {string} learnerName
 * @param {string} courseId
 * @returns {Promise<Object>} withdrawal details
 */
async function withdrawFromCourse(learnerName, courseId) {
  try {
    // Stages 1-2: verify + process (Promise chaining)
    const withdrawalDetails = await verifyEnrollmentForWithdrawal(learnerName, courseId)
      .then((record) => processWithdrawal(record));

    // Stage 3: confirm (async/await)
    return await confirmWithdrawal(withdrawalDetails);
  } catch (err) {
    lmsEvents.emit("operationFailed", { operation: "Course Withdrawal", reason: err.message });
    throw err;
  }
}

module.exports = { withdrawFromCourse };

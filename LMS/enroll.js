"use strict";

const chalk = require("chalk");
const { getCourseById, hasAvailableSeats, incrementEnrollment } = require("./courses");
const lmsEvents = require("./events");

// ─── In-memory enrollment store ───────────────────────────────────────────────
const enrollments = [];

/**
 * STAGE 1 (Promise): Validate the learner session
 * @param {string} learnerName
 * @returns {Promise<string>}
 */
function validateLearnerSession(learnerName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!learnerName || learnerName.trim().length < 2) {
        reject(new Error("Invalid learner session. Please restart the application."));
      } else {
        resolve(learnerName.trim());
      }
    }, 100);
  });
}

/**
 * STAGE 2 (Promise): Validate that the course exists
 * @param {string} courseId
 * @returns {Promise<Object>}
 */
function validateCourse(courseId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const course = getCourseById(courseId);
      if (!course) {
        reject(new Error(`Course "${courseId}" does not exist.`));
      } else {
        resolve(course);
      }
    }, 100);
  });
}

/**
 * STAGE 3 (Promise): Check for duplicate enrollment
 * @param {string} learnerName
 * @param {Object} course
 * @returns {Promise<Object>}
 */
function checkDuplicateEnrollment(learnerName, course) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const alreadyEnrolled = enrollments.some(
        (e) =>
          e.learnerName.toLowerCase() === learnerName.toLowerCase() &&
          e.courseId === course.id
      );
      if (alreadyEnrolled) {
        reject(new Error(`You are already enrolled in "${course.title}".`));
      } else {
        resolve(course);
      }
    }, 100);
  });
}

/**
 * STAGE 4 (Promise): Check course seat availability
 * @param {Object} course
 * @returns {Promise<Object>}
 */
function checkCourseAvailability(course) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!hasAvailableSeats(course.id)) {
        reject(
          new Error(
            `"${course.title}" is fully booked (${course.enrollmentLimit}/${course.enrollmentLimit} seats taken).`
          )
        );
      } else {
        resolve(course);
      }
    }, 120);
  });
}

/**
 * STAGE 5 (Promise): Generate enrollment record
 * @param {string} learnerName
 * @param {Object} course
 * @returns {Promise<Object>}
 */
function generateEnrollmentRecord(learnerName, course) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const record = {
        learnerName,
        courseId: course.id,
        courseTitle: course.title,
        instructor: course.instructor,
        totalLessons: course.totalLessons,
        lessons: [...course.lessons],
        enrollmentTimestamp: Date.now(),
        completedLessons: [],
        progressPercentage: 0,
      };
      resolve(record);
    }, 150);
  });
}

/**
 * STAGE 6 (async/await): Confirm and save the enrollment
 * @param {Object} record
 * @returns {Promise<Object>}
 */
async function confirmEnrollment(record) {
  return new Promise((resolve) => {
    setTimeout(() => {
      enrollments.push(record);
      incrementEnrollment(record.courseId);
      resolve(record);
    }, 100);
  });
}

/**
 * Full enrollment workflow using Promise chaining + async/await
 * @param {string} learnerName
 * @param {string} courseId
 * @returns {Promise<Object>} enrolled record
 */
async function enrollLearner(learnerName, courseId) {
  lmsEvents.emit("enrollmentStarted", { courseTitle: courseId });

  try {
    // Stages 1-2: validate learner + course (Promise chaining)
    const validatedName = await validateLearnerSession(learnerName);
    const course = await validateCourse(courseId);

    // Stages 3-5: checks + record generation (Promise chaining)
    const availableCourse = await checkDuplicateEnrollment(validatedName, course)
      .then((c) => checkCourseAvailability(c))
      .then((c) => generateEnrollmentRecord(validatedName, c));

    // Stage 6: confirm (async/await)
    const record = await confirmEnrollment(availableCourse);

    lmsEvents.emit("enrollmentConfirmed", {
      learnerName: record.learnerName,
      courseTitle: record.courseTitle,
      timestamp: record.enrollmentTimestamp,
    });

    return record;
  } catch (err) {
    lmsEvents.emit("operationFailed", { operation: "Enrollment", reason: err.message });
    throw err;
  }
}

/**
 * Get all enrollments for a learner
 * @param {string} learnerName
 * @returns {Array}
 */
function getLearnerEnrollments(learnerName) {
  return enrollments.filter(
    (e) => e.learnerName.toLowerCase() === learnerName.toLowerCase()
  );
}

/**
 * Get a specific enrollment record
 * @param {string} learnerName
 * @param {string} courseId
 * @returns {Object|null}
 */
function getEnrollmentRecord(learnerName, courseId) {
  return (
    enrollments.find(
      (e) =>
        e.learnerName.toLowerCase() === learnerName.toLowerCase() &&
        e.courseId === courseId
    ) || null
  );
}

/**
 * Remove an enrollment record (used by withdraw)
 * @param {string} learnerName
 * @param {string} courseId
 * @returns {boolean}
 */
function removeEnrollment(learnerName, courseId) {
  const idx = enrollments.findIndex(
    (e) =>
      e.learnerName.toLowerCase() === learnerName.toLowerCase() &&
      e.courseId === courseId
  );
  if (idx === -1) return false;
  enrollments.splice(idx, 1);
  return true;
}

module.exports = {
  enrollLearner,
  getLearnerEnrollments,
  getEnrollmentRecord,
  removeEnrollment,
};

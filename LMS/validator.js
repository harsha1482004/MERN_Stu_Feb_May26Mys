"use strict";

const chalk = require("chalk");

const MAX_RETRIES = 3;

/**
 * Validate a learner name (callback-based)
 * @param {string} name
 * @param {Function} callback - (err, validatedName)
 */
function validateLearnerName(name, callback) {
  const trimmed = name.trim();
  if (!trimmed || trimmed.length < 2) {
    return callback(new Error("Name must be at least 2 characters long."));
  }
  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
    return callback(new Error("Name can only contain letters, spaces, hyphens, or apostrophes."));
  }
  callback(null, trimmed);
}

/**
 * Validate a menu choice (callback-based)
 * @param {string} input
 * @param {number} min
 * @param {number} max
 * @param {Function} callback - (err, choice)
 */
function validateMenuChoice(input, min, max, callback) {
  const num = parseInt(input, 10);
  if (isNaN(num) || num < min || num > max) {
    return callback(
      new Error(`Please enter a valid option between ${min} and ${max}.`)
    );
  }
  callback(null, num);
}

/**
 * Validate a course ID selection (callback-based)
 * @param {string} input
 * @param {Array} availableCourses
 * @param {Function} callback - (err, course)
 */
function validateCourseSelection(input, availableCourses, callback) {
  const trimmed = input.trim().toUpperCase();
  const course = availableCourses.find(
    (c) => c.id.toUpperCase() === trimmed
  );
  if (!course) {
    return callback(new Error(`Course ID "${input.trim()}" not found. Please enter a valid Course ID.`));
  }
  callback(null, course);
}

/**
 * Validate a lesson number selection (callback-based)
 * @param {string} input
 * @param {number} totalLessons
 * @param {Function} callback - (err, lessonIndex)
 */
function validateLessonSelection(input, totalLessons, callback) {
  const num = parseInt(input, 10);
  if (isNaN(num) || num < 1 || num > totalLessons) {
    return callback(
      new Error(`Please enter a lesson number between 1 and ${totalLessons}.`)
    );
  }
  callback(null, num - 1); // zero-indexed
}

/**
 * Retry wrapper — allows up to MAX_RETRIES attempts before calling onExhausted
 * @param {Function} promptFn  - async () => string  (calls readline)
 * @param {Function} validateFn - (input, cb) => void
 * @param {Function} onSuccess - (result) => void
 * @param {Function} onExhausted - () => void
 * @param {number} [attemptsLeft]
 * @param {...any} extraArgs - extra args forwarded to validateFn
 */
function withRetry(promptFn, validateFn, onSuccess, onExhausted, attemptsLeft, ...extraArgs) {
  if (attemptsLeft === undefined) attemptsLeft = MAX_RETRIES;

  promptFn().then((input) => {
    validateFn(input, ...extraArgs, (err, result) => {
      if (err) {
        console.log(chalk.red(`  ⚠  ${err.message}`));
        const remaining = attemptsLeft - 1;
        if (remaining <= 0) {
          console.log(chalk.red.bold("  ❌ Too many invalid attempts. Returning to menu."));
          return onExhausted();
        }
        console.log(chalk.yellow(`  ↺  ${remaining} attempt(s) remaining.`));
        withRetry(promptFn, validateFn, onSuccess, onExhausted, remaining, ...extraArgs);
      } else {
        onSuccess(result);
      }
    });
  });
}

module.exports = {
  validateLearnerName,
  validateMenuChoice,
  validateCourseSelection,
  validateLessonSelection,
  withRetry,
  MAX_RETRIES,
};

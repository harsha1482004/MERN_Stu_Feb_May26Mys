"use strict";

// ─── Learner Session State ────────────────────────────────────────────────────
let learnerSession = {
  name: null,
  sessionStart: null,
  loginAttempts: 0,
};

/**
 * Set the learner's name and start the session
 * @param {string} name
 */
function setLearner(name) {
  learnerSession.name = name.trim();
  learnerSession.sessionStart = Date.now();
}

/**
 * Get the current learner session
 * @returns {Object}
 */
function getLearner() {
  return learnerSession;
}

/**
 * Check if a learner session is active
 * @returns {boolean}
 */
function hasActiveLearner() {
  return learnerSession.name !== null;
}

/**
 * Get session duration in human-readable format
 * @returns {string}
 */
function getSessionDuration() {
  if (!learnerSession.sessionStart) return "N/A";
  const ms = Date.now() - learnerSession.sessionStart;
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}

module.exports = {
  setLearner,
  getLearner,
  hasActiveLearner,
  getSessionDuration,
};

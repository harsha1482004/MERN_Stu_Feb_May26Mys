function validateCourseId(id) {
  const num = parseInt(id);

  if (isNaN(num) || num <= 0) {
    return null;
  }
  return num;
}

function validateLessonIndex(index) {
  const num = parseInt(index);

  if (isNaN(num) || num < 0) {
    return null;
  }
  return num;
}

module.exports = {
  validateCourseId,
  validateLessonIndex
};
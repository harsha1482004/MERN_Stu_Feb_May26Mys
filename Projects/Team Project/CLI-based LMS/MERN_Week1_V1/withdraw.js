const { getEnrolledCourses } = require("./enroll");

function withdrawCourse(courseId) {
  const enrolledCourses = getEnrolledCourses();

  const index = enrolledCourses.findIndex(c => c.id === courseId);
  if (index === -1) {
    return "You are not enrolled in this course";
  }
  const removed = enrolledCourses.splice(index, 1);
  return `Withdrawn from ${removed[0].title}`;
}

module.exports = { withdrawCourse };
const { courses } = require("./courses");

let enrolledCourses = [];

function enrollCourse(courseId) {
  const course = courses.find(c => c.id === courseId);

  if (!course) return "Course not found";

  if (enrolledCourses.find(c => c.id === courseId)) {
    return "Already enrolled";
  }

  enrolledCourses.push({
    ...course,
    completedLessons: [],
    progress: 0
  });

  return `Enrolled in ${course.title}`;
}

function getEnrolledCourses() {
  console.log("\nYour enrolled courses are:");
  return enrolledCourses;
}

module.exports = {
  enrollCourse,
  getEnrolledCourses
};
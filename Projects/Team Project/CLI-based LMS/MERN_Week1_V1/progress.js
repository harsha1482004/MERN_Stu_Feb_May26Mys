const { getEnrolledCourses } = require("./enroll");

// Complete lesson
function completeLesson(courseId, lessonIndex) {
  const enrolledCourses = getEnrolledCourses();
  const course = enrolledCourses.find(c => c.id === courseId);

  if (!course) return "Not enrolled in this course";

  if (lessonIndex < 0 || lessonIndex >= course.lessons.length) {
    return "Invalid lesson index";
  }

  if (!course.completedLessons.includes(lessonIndex)) {
    course.completedLessons.push(lessonIndex);
  }

  // Calculate progress
  course.progress =
    (course.completedLessons.length / course.lessons.length) * 100;

  return `Progress updated: ${course.progress.toFixed(2)}%`;
}

// View progress of all enrolled courses
function viewProgress() {
  const enrolledCourses = getEnrolledCourses();

  if (enrolledCourses.length === 0) {
    console.log("\n No enrolled courses");
    return;
  }

  console.log("\n Course Progress:\n");

  enrolledCourses.forEach(course => {
    console.log(`ID: ${course.id} - ${course.title}`);
    console.log(`Progress: ${course.progress.toFixed(2)}%`);

    if (course.progress === 100) {
      console.log(" Completed!");
    }

    console.log("----------------------");
  });
}

module.exports = {
  completeLesson,
  viewProgress
};
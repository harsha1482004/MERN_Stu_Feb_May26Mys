const courses = require("./courses");

let enrolledCourses = [];

function enrollCourse(courseId) {
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return "Course not found";
  }

  const alreadyEnrolled = enrolledCourses.find(c => c.id === courseId);
  if (alreadyEnrolled) {
    return "Already enrolled in this course";
  }

  enrolledCourses.push(course);
  
  return `Successfully enrolled in ${course.title}\n`;
  
}

function viewEnrolledCourses() {
  if (enrolledCourses.length === 0) {
    console.log(" No courses enrolled yet.");
    return;
  }

  console.log("Your Enrolled Courses:");

  enrolledCourses.forEach(course => {
    console.log(`ID: ${course.id} - ${course.title}`);
  });
}

module.exports = {enrollCourse,viewEnrolledCourses};
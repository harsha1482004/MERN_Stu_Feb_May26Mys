const readline = require("readline");
const courses = require("./courses");
const { enrollCourse,viewEnrolledCourses } = require("./enroll");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("\n Available Courses:");
courses.forEach(course => {
  console.log(`ID: ${course.id} - ${course.title}`);
});


rl.question("\nEnter Course ID to enroll: ", (input) => {
  const courseId = parseInt(input);

  const message = enrollCourse(courseId);
  console.log(message);

  viewEnrolledCourses();

  rl.close();
});
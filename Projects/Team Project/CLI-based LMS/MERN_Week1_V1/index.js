const readline = require("readline");
const { viewCourses } = require("./courses");
const { enrollCourse, getEnrolledCourses } = require("./enroll");
const { withdrawCourse } = require("./withdraw");
const { completeLesson, viewProgress } = require("./progress");
const { validateCourseId, validateLessonIndex } = require("./validator");
const emitter = require("./events");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function viewEnrolledCourses() {
  const courses = getEnrolledCourses();

  if (courses.length === 0) {
    console.log("No enrolled courses");
    return;
  }

  courses.forEach(c => {
    console.log(`ID: ${c.id} - ${c.title}`);
  });
}

function menu() {
  console.log(`
====== CLI LMS ======
1. View Courses
2. Enroll
3. View Enrolled
4. Complete Lesson
5. View Progress  
6. Withdraw
7. Exit
`);

  rl.question("Choose option: ", (choice) => {
    switch (choice) {
      case "1":
        viewCourses();
        return menu();

      case "2":
        rl.question("Course ID: ", (id) => {
          const validId = validateCourseId(id);
          if (!validId) return emitter.emit("error", "Invalid ID"), menu();

          emitter.emit("enroll", enrollCourse(validId));
          menu();
        });
        break;

      case "3":
        viewEnrolledCourses();
        menu();
        break;

      case "4":
        rl.question("Course ID: ", (cId) => {
          rl.question("Lesson Index: ", (lIdx) => {
            const id = validateCourseId(cId);
            const index = validateLessonIndex(lIdx);

            if (!id || index === null) {
              emitter.emit("error", "Invalid input");
              return menu();
            }

            emitter.emit("progress", completeLesson(id, index));
            menu();
          });
        });
        break;

      case "5":
        viewProgress();
        menu();
        break;

      case "6":
        rl.question("Course ID: ", (id) => {
          const validId = validateCourseId(id);
          if (!validId) return emitter.emit("error", "Invalid ID"), menu();

          emitter.emit("withdraw", withdrawCourse(validId));
          menu();
        });
        break;

      case "7":
        console.log("\nThank you for using CLI LMS!");
        rl.close();
        break;

      default:
        emitter.emit("error", "Invalid choice");
        menu();
    }
  });
}

menu();
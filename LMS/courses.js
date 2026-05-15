"use strict";

// ─── Course Data ──────────────────────────────────────────────────────────────
const courses = [
  {
    id: "WD101",
    title: "HTML & CSS Fundamentals",
    instructor: "Sarah Johnson",
    category: "Web Development",
    difficulty: "Beginner",
    totalLessons: 6,
    enrollmentLimit: 30,
    enrolled: 0,
    lessons: [
      "Introduction to HTML",
      "HTML Elements & Attributes",
      "CSS Selectors & Properties",
      "Box Model & Layout",
      "Flexbox & Grid",
      "Responsive Design Basics",
    ],
    description:
      "Learn the building blocks of the web. This course covers HTML structure and CSS styling to build beautiful, responsive web pages.",
  },
  {
    id: "WD202",
    title: "JavaScript for Beginners",
    instructor: "Michael Chen",
    category: "Web Development",
    difficulty: "Beginner",
    totalLessons: 7,
    enrollmentLimit: 25,
    enrolled: 0,
    lessons: [
      "Variables & Data Types",
      "Control Flow & Loops",
      "Functions & Scope",
      "Arrays & Objects",
      "DOM Manipulation",
      "Events & Callbacks",
      "Fetch API & Promises",
    ],
    description:
      "Master JavaScript from scratch. Covers syntax, logic, DOM manipulation, and async programming to make your web pages interactive.",
  },
  {
    id: "PY301",
    title: "Python Programming Essentials",
    instructor: "Dr. Aisha Patel",
    category: "Programming",
    difficulty: "Beginner",
    totalLessons: 8,
    enrollmentLimit: 20,
    enrolled: 0,
    lessons: [
      "Python Setup & Syntax",
      "Data Types & Variables",
      "Conditionals & Loops",
      "Functions & Modules",
      "Lists, Tuples & Dictionaries",
      "File Handling",
      "OOP in Python",
      "Error Handling",
    ],
    description:
      "A comprehensive introduction to Python. Learn scripting, data structures, OOP, and file handling with hands-on examples.",
  },
  {
    id: "DB401",
    title: "SQL & Database Design",
    instructor: "James Rivera",
    category: "Database",
    difficulty: "Intermediate",
    totalLessons: 6,
    enrollmentLimit: 15,
    enrolled: 0,
    lessons: [
      "Introduction to Databases",
      "SQL Basics: SELECT, INSERT, UPDATE",
      "Filtering & Sorting Data",
      "Joins & Relationships",
      "Database Normalization",
      "Indexes & Query Optimization",
    ],
    description:
      "Learn relational database concepts and SQL. Design schemas, write queries, and optimize database performance.",
  },
  {
    id: "SK501",
    title: "Effective Communication Skills",
    instructor: "Emily Watson",
    category: "Soft Skills",
    difficulty: "Beginner",
    totalLessons: 5,
    enrollmentLimit: 40,
    enrolled: 0,
    lessons: [
      "Principles of Clear Communication",
      "Active Listening Techniques",
      "Written Communication Best Practices",
      "Public Speaking & Presentations",
      "Conflict Resolution",
    ],
    description:
      "Develop the communication skills needed in professional environments. Learn verbal, written, and interpersonal techniques.",
  },
  {
    id: "ND601",
    title: "Node.js & Backend Development",
    instructor: "Carlos Mendes",
    category: "Web Development",
    difficulty: "Intermediate",
    totalLessons: 8,
    enrollmentLimit: 20,
    enrolled: 0,
    lessons: [
      "Node.js Fundamentals & REPL",
      "CommonJS Modules & NPM",
      "File System & Path Modules",
      "EventEmitter & Events",
      "Callbacks, Promises & Async/Await",
      "Building a REST API with Express",
      "Middleware & Error Handling",
      "Connecting to a Database",
    ],
    description:
      "Build scalable server-side applications with Node.js. Covers core modules, async programming, and REST API development.",
  },
  {
    id: "DS701",
    title: "Data Structures & Algorithms",
    instructor: "Prof. Linda Zhao",
    category: "Programming",
    difficulty: "Advanced",
    totalLessons: 9,
    enrollmentLimit: 15,
    enrolled: 0,
    lessons: [
      "Arrays & Linked Lists",
      "Stacks & Queues",
      "Hash Maps & Sets",
      "Trees & Binary Search Trees",
      "Graphs & BFS/DFS",
      "Sorting Algorithms",
      "Searching Algorithms",
      "Dynamic Programming Basics",
      "Problem-Solving Patterns",
    ],
    description:
      "Master data structures and algorithms for technical interviews and efficient programming. Includes complexity analysis.",
  },
  {
    id: "SK801",
    title: "Time Management & Productivity",
    instructor: "Rachel Kim",
    category: "Soft Skills",
    difficulty: "Beginner",
    totalLessons: 5,
    enrollmentLimit: 50,
    enrolled: 0,
    lessons: [
      "Understanding Your Time",
      "Goal Setting & Prioritization",
      "Deep Work & Focus Techniques",
      "Managing Distractions",
      "Building Productive Habits",
    ],
    description:
      "Learn proven strategies for managing your time, setting goals, and staying productive in work and study environments.",
  },
];

/**
 * Get all courses
 * @returns {Array} list of all courses
 */
function getAllCourses() {
  return courses;
}

/**
 * Find a course by ID
 * @param {string} courseId
 * @returns {Object|null} course object or null
 */
function getCourseById(courseId) {
  return courses.find((c) => c.id.toUpperCase() === courseId.toUpperCase()) || null;
}

/**
 * Find a course by title (case-insensitive partial match)
 * @param {string} title
 * @returns {Object|null}
 */
function getCourseByTitle(title) {
  return (
    courses.find((c) => c.title.toLowerCase().includes(title.toLowerCase())) || null
  );
}

/**
 * Check if course has available seats
 * @param {string} courseId
 * @returns {boolean}
 */
function hasAvailableSeats(courseId) {
  const course = getCourseById(courseId);
  if (!course) return false;
  return course.enrolled < course.enrollmentLimit;
}

/**
 * Increment enrollment count for a course
 * @param {string} courseId
 */
function incrementEnrollment(courseId) {
  const course = getCourseById(courseId);
  if (course) course.enrolled++;
}

/**
 * Decrement enrollment count for a course
 * @param {string} courseId
 */
function decrementEnrollment(courseId) {
  const course = getCourseById(courseId);
  if (course && course.enrolled > 0) course.enrolled--;
}

/**
 * Get courses grouped by category
 * @returns {Object}
 */
function getCoursesByCategory() {
  return courses.reduce((acc, course) => {
    if (!acc[course.category]) acc[course.category] = [];
    acc[course.category].push(course);
    return acc;
  }, {});
}

module.exports = {
  getAllCourses,
  getCourseById,
  getCourseByTitle,
  hasAvailableSeats,
  incrementEnrollment,
  decrementEnrollment,
  getCoursesByCategory,
};

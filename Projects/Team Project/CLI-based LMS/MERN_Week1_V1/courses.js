const courses=[
  {
    id:1,
    title:"Node.js Basics",
    instructor:"Rakesh",
    lessons:["Intro","Modules","Async","Events"],
    category:"Programming",
    level:"Beginner",
    seats:3
  },
  {
    id:2,
    title:"MongoDB",
    instructor:"XYZ",
    lessons:["Intro", "CRUD", "Aggregation"],
    category:"Database",
    level:"Intermediate",
    seats:2
  },
  {
    id: 3,
    title:"HTML & CSS",
    instructor:"ABC",
    lessons:["Intro","Form & Input Fields", "Layouts", "FlexBox", "Grid"],
    category:"Web Development",
    level:"Beginner",
    seats:5
  }
];

// function viewCoures(){
//     console.log("Available Courses:\n")
//     courses.forEach(course => {
//     console.log(`Id: ${course.id},  Title: ${course.title}`);  
//   });
// }

module.exports = courses;
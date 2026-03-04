// Javascript Basics of Objects
const person={
    name:"Rahul",
    age:21,
    isStudent:false
};
console.log("Person:",person.name);
console.log("Age:",person.age);

// Add a new property
person.city="Mysore";
console.log("Person",person);

// modify
person.age=31;
// delete
delete person.isStudent;
console.log("Person",person);

// Object Constructor
const car=new Object();
car.make="Audi";
car.model="A7"
car.year=2026;
console.log(car);

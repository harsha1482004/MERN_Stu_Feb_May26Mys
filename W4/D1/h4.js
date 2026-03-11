// logging
// console.log("Console logging");

// console.warn("Warning message");

// console.error("Error message")

let users=[
    {id:1,name:"Animal"},
    {id:2,name:"Santu"},
];

console.log(users);
console.table(users);

// Group related logs
console.group("Grouped logs");
console.log("Log1");
console.log("Log2");
console.log("Log3");
console.groupEnd();

// Measure execution time
console.time("LoopTime");
for(let i=0;i<1000;i++){
}
console.timeEnd("LoopTime")
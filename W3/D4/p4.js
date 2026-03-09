// // Filter method
// let marks=[75,49,88,93,100,65,50];
// let passed=marks.filter(mark=>mark>=70);
// console.log(marks);
// console.log(passed);

let marks=[
    {name:"harsha",score:80},
    {name:"hrithik",score:90},
    {name:"jeevan",score:85},
    {name:"puneeth",score:95},
    {name:"shreyas",score:75}
];
let passed=marks.filter(marks=> marks.score>80).map(passed=>passed.name);

console.log("Passed students:",passed);


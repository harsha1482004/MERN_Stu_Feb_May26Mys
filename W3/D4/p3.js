// // Array Map
// let numArray=[1,2,3,4];
// let square =numArray.map(numArray => numArray*numArray);
// console.log(square);

// ex:2
let prices=[100,200,300,400];
let priceWithGST=prices.map(price=>price+price*0.18);
console.log("price without tax",prices);
console.log("price with tax",priceWithGST);

// using map to extract files
let users=[
    {name:"harsha",age:21},
    {name:"hruthik",age:21},
];
// individual objects
let names=users.map(user=>user.name);
console.log(" ",names);
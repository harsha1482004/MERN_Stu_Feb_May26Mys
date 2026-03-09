// Array basics
console.log("Array basics");
// Creating arrays
let emptyArray=[];
let numArray=[1,2,3,4];
let mixedArray=[42,"hello",true,null,{name:"Gola"},[5,6]];
console.log(emptyArray);
console.log(numArray);
console.log(mixedArray);

// Using Consrutors
let fruits=new Array("apple","mango");
console.log(fruits);
console.log("is fruits an array:",Array.isArray(fruits));

// push
fruits.push("cherry");
console.log(fruits);

// pop
fruits.pop();
console.log(fruits);

// unshift:adds to begining
fruits.unshift("orange");
console.log(fruits);

// shift:remove to begining
fruits.shift("orange");
console.log(fruits);

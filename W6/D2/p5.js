// Microtasks and Macrotasks in Node.js
console.log("1. Synchronous start");

// Promise.resolve(...).then(...) schedule a microtasks
// Promise.resolve().then(function(){
//     console.log("3. Promise microtask executed");         // Asynchronous code
// });
// setTimeout(...,0) schedule task for a later time. Even when the delay 0, it doesn't interrput current syncronous code.
setTimeout(() => {
    console.log("4. Timer callback executed");           // Asynchronous code
},0);

Promise.resolve().then(function(){
    console.log("3. Promise microtask executed");         // Asynchronous code it is higher priority than callback function
});

console.log("2. Synchronous ends");
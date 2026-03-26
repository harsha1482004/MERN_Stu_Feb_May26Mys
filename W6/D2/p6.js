// Process.nextTick, Promise microtask & Timer 
console.log("1. Start of Script");

// process.nextTick schedules a callback to run soon after the current sychronus code completes.
process.nextTick(function(){
    console.log("3. Process.nextTick callback executed");                // process.nextTick has higher priority than promise.resolve
});
// promise microtask runs after nextTick in Node.js
Promise.resolve().then(function(){
    console.log("4. Promise microtask executed");
});

// callback timer runs later
setTimeout(() => {
    console.log("5. Timer callback executed");
},0);

console.log("2. End of script");
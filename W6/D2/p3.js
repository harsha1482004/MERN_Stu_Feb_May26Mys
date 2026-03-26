// Event loop with multiple asynchronus tasks 
console.log("Main Script started");

setTimeout(() => {
    console.log("Timer A finished after 500ms");
},500);

setTimeout(() => {
    console.log("Timer B finished after 100ms");
},100);

setTimeout(() => {
    console.log("Timer C finished after 0ms, but still waits for sync code to complete");

},0);

console.log("Main Script ended");
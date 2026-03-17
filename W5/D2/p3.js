// Asynchronous approach of Node.js

console.log("Step 1: Script started");
setTimeout(()=>{
    console.log("Step 3: Delayed callback finished. P1");
},1000);

setTimeout(function(){
    console.log("Step 3: Delayed callback finished. P2");
},3000);

console.log("Step 2: Script did not stop waiting")
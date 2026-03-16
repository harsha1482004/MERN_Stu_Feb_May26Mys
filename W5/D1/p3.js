console.log("Node.js architecture demo")
console.log("1. Script started");

// SetTimeOut
setTimeout(()=>{
    console.log("3. Timer callback finished after waiting");
},10000);
console.log("2. Script continued without waiting for timer callback");
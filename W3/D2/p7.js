// Immediately invoked function expression(IIFE)
(function(){
    console.log("Basic IIFE executed immediately");
})();

// With parameters
(function(appName,version){
    console.log("App:",appName,"version:",version);
})("Node.js","v24.22.1");

// With return value
const result=(function(){
    const a=10,b=20;
    return a+b;
})();
console.log("Sum is:",result);
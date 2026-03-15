// Assignment 3: Permission Rules Engine Summary

// You are given an array of permission rules:
// { role: "admin" | "student" | "guest", action: "READ" | "WRITE", allowed: true | false }
// Write code that:
// 1. Filters rules to keep only those where allowed === true.
// 2. Creates a simplified allowedPairs array using map such that each element becomes:
// "role:action"
// Example: "admin:WRITE"
// 3. Builds a summary object using reduce counting how many allowed rules each role has:
// { admin: 2, student: 1, guest: 0 }
// 4. Print allowedRules, allowedPairs, and summary.

let permission=[
    { role:"admin",action:"READ",allowed:true},
    { role:"student", action: "WRITE", allowed: true },
    { role:"guest", action: "READ", allowed:false }
];

let rules=permission.filter(permission=>permission.allowed===true);
console.log("Permissions allowed: ",rules);

const allowedPairs=permission.map(permission=>permission.role || permission.action);
console.log("Allowed pairs: ",allowedPairs);

let count=permission.reduce((startvalue,cmpvalue)=>{
    startvalue[cmpvalue]=(startvalue[cmpvalue] || 0)+ 1;
    return startvalue;
},{});
console.log("Summary:",count);
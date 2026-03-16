// Introduction to node.js

const runtimeName="Node.js";
console.log("Introdution to node.js");
console.log(`${runtimeName} runs javaScript outside the browser`);

const commonUsers=[
    "used for server-side app",
    "automation scripts can be created"
];

// Array destructuring
console.log(commonUsers[0]);
console.log(commonUsers[1]);

commonUsers.forEach((commonUser,index)=>{
    console.log(`${index+1}.${commonUser}`);
})
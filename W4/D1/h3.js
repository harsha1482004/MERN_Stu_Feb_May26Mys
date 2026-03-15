// // throw errors
// function divide(a,b){
//     if(b===0){
//         throw new Error("cannot divide by zero");
//     }
//     return a/b;
// }
// try{
//     console.log(divide(10,20));
//     console.log(divide(10,0));
// }
// catch(err){
//     console.log("caugth:",err.message);
// }

// // throw errors
// function checkAge(age){
//     if(age<=18){
//         throw new Error("age must be 18 or above");
//     }
//     console.log("You can vote")
//     return age;
// }
// try{
//     console.log(checkAge(19));
//     console.log(checkAge(3));
// }
// catch(err){
//     console.log("caugth:",err.message);
// }

// Create a custom error class
class VallidationError extends Error{
    constructor(message){
        super (message);
        this.name="ValidationError";
    }
}
function createUser(name){
        if(!name){
            throw new VallidationError("name is required")
        }
        console.log("Hi",+name+" welcome")
}
try{
    // createUser("");
    createUser("Rahul");
}
catch(err){
    console.log("caugth:",err.message);
}
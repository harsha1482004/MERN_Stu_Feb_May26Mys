// Introdution to callback func
function greetUser(name,callback){
    console.log("Hello, "+name);
    // Callback fun is executed only after the execution of the current function
    callback();
};

function showCompleteMessage(name){
    console.log("The greeting task is complete.");
}
greetUser("Ranjith",showCompleteMessage);
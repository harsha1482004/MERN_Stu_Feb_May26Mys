//Conditional statements
let age=20;
if(age<13){
    console.log("Child");
}
else if(age<19){
    console.log("Teenager");
}
else{
    console.log("Adult");
}

// Switch Statements
console.log("Switch Statements")
let day='C';
switch(day){
    case "Monday":
        console.log("Start of the week");
        break;
    case "Wednesday":
        console.log("mid of the week");
        break;
    case "C":
        console.log("end of the week");
        break;
    default:
        console.log("Some day in the week");
        break;
}

// Type Conversion
let n=Number('ABC');
console.log("n: ",n,"Type of n:",typeof n,"isNaN",isNaN(n));
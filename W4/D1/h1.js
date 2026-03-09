// try catch basics
// Reference error
const error=document.getElementById("error");
try{
    console.log("trying to access undefined variable");
    console.log(notDefined);
}
catch(err){
    console.log("Error caugth",err.name,"-",err.message);
    error.textContent="trying to access undefined variable";
}
console.log("Program execution continues");

// JSON Parsing error
let jsonText="{ JSON }";
try{
    let data=JSON.parse(jsonText);
    console.log(data);
}
catch(err){
    console.log("JSON parse error",err.message)
}

try{
    let num=10;
    num();
}
catch(err){
    console.log("Caugth error: ",err.name);
}
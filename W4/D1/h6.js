// // finally
// function exp(){
//     try{
//         console.log("Example in try block");
//         return "TRY_RETURN";
//     }
//     finally{
//         console.log("This is printed");
//     }
// }
//  console.log("Example Results:",exp());

//  return in catch block and still not finslly

function exp2(){
try{
    try{
        throw new Error("new error");
    }
    catch(e){
        console.log("Example 1:caugth error");
        // return 10;
    }
}
    finally{
        console.log("Example 1:finally still running");
    }
}

console.log("Example 1:",exp2());


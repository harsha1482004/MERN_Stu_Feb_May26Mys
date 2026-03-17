// callback error
function divideNumber(a,b, callback){
    if(b==0){
        callback("Cannot divide by zero",null);
        return;
    }
    const result=a/b;
    callback(null,result);
}

divideNumber(10,0,function(error,result){
    if(error){
        console.log("Error: ",error);
        return
    }
    console.log("Result:",result)
});
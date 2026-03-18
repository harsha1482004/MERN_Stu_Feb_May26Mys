// Usage of try catch finally with async/await

function processPayment(isSuccessded){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            if(isSuccessded){
                resolve("Payment processed successfully")
            }
            else{
                reject("Payment couldn't processed successfully")
            }
        });
    });
}
async function runPaymentflow(isSuccessded) {
    try{
        const result=await processPayment(isSuccessded);
        console.log("Success: ",result);
    }
    catch(error){
        console.log("Failure: ",error);
    }
    finally{
        console.log("Payment flow completed.");
    }
}
runPaymentflow(true).then(function(){
    return runPaymentflow(false);
});

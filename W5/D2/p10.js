// Chaining promises with returned values
function getBaseAmount(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(1000);
        },500);
    });
}
getBaseAmount()
.then(function(amount){
    console.log("Base amount: ",amount);
    return amount+200;
})
.then(function(updateAmount){
    console.log("Amount after service charge: ",updateAmount);
    return updateAmount-100;
})
.then(function(finalAmount){
    console.log("Final amount after detection: ",finalAmount);
});
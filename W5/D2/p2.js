// Basic callback variations
// 1. callback with no input data
// 2. callback that receives data from main function

function runTask(callback){
    console.log("Task is running..");
    callback();
}
function runTaskWithResult(taskName,callback){
    console.log("Processing task: ",taskName);
    callback("Task "+taskName+"finished succesfully.");
}
function showSimpleMessage(){
    console.log("Simple callback executed");
}
function showCompleteMessage(message){
    console.log(message);
}

// runTask(showSimpleMessage);
runTaskWithResult("Send monthly report ",showCompleteMessage)
// Callback functions
// It is a fuc which is passed as an argument to another fun
function greet(name,Callback){
    console.log("Hello,",name)
    Callback();
}
greet("Harsha",function(){
    console.log("Callback function executed");
})
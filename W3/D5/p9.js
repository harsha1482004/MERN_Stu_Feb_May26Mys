const onceBtn=document.getElementById("onceBtn");

// Limiting listener to once only for a event
onceBtn.addEventListener("click",function(){
    console.log("This click listener woks only once.");
},{once:true});

document.addEventListener("keydown",function(event){
    if(event.ctrlKey && event.key.toLowerCase()==="s"){
        event.preventDefault();
        console.log("Custom control+s shortcut triggered");
    }
});
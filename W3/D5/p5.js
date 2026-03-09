const startBtn=document.getElementById("startBtn");
const removeBtn=document.getElementById("removeBtn");

function handleClick(){
    console.log("startBtn is clicked");
}
startBtn.addEventListener("click",handleClick);

removeBtn.addEventListener("click",function(){
    startBtn.removeEventListener("click",handleClick);
    console.log("Click listener removed from startBtn")
});
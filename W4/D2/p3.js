// 
const container=document.getElementById("container");

// position
// before begin
// after begin
// before end
// after end
document.getElementById("btn").addEventListener("click",function(){
    container.insertAdjacentHTML("beforebegin",
        "<p>Dynamically inserted</p>");
});
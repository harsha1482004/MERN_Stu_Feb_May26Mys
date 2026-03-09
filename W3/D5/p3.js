// mouse events
const hoverBox = document.getElementById("hoverBox");

hoverBox.addEventListener("mouseover",function(){
    hoverBox.textContent = "Mouse is over me";
    hoverBox.style.backgroundColor = "Lightyellow";
});

hoverBox.addEventListener("mouseout",function(){
    hoverBox.textContent = "hover over me";
});
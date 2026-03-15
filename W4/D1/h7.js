console.log("Document Object",document);
console.log("page title",document.title);

//const heading = document.getElementById("MainHeading");
// console.log("Heading text",heading.textContent);

//getElementsByClassName
const info = document.getElementsByClassName("info");
const run = document.getElementById("run");

//
const spanTag = document.getElementsByTagName("span");


run.addEventListener("click",function(){
    //query selector:returns the first element matchs the css selector
    const mainFirstHeading = document.querySelector(".mainHeading");
    mainFirstHeading.style.color = "red";
    
    for(let i=0;i<info.length;i++){
        console.log(info[i].textContent);
        info[i].style.color = "blue";
    }


    for(let i=0;i<spanTag.length;i++){
        console.log(spanTag[i].textContent);
        spanTag[i].style.backgroundColor = "lightgreen";
    }
    for(let i=0;i<mainFirstHeading.length;i++){
        console.log(mainFirstHeading[i].textContent);
        mainFirstHeading[i].style.backgroundColor = "lightgreen";
    }
});

//query selector all: returns all elements matching the selector
const tasks = document.querySelectorAll(".task");
//task.style.color = "purple";
tasks.forEach(function(task){
    task.style.color = "purple";
})
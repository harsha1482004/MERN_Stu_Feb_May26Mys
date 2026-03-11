const themeInput=document.getElementById("themeInput");
const output=document.getElementById("output");

document.getElementById("saveBtn").addEventListener("click",function(){
    sessionStorage.setItem("theme",themeInput.value);
    sessionStorage.setItem("UserName","Harsha");
    sessionStorage.setItem("loggedIn",true);
    console.log("Saved theme: ",themeInput.value);
    output.textContent="Save theme to sessionStorage";
    output.style.color="green";
});

document.getElementById("readBtn").addEventListener("click",function(){
    sessionStorage.getItem("theme",themeInput.value);
    output.textContent="Save theme to sessionStorage";
    output.style.color="green";
});

document.getElementById("removeBtn").addEventListener("click",function(){
    sessionStorage.removeItem("loggedIn");
    output.textContent="Removed:loggedIn";
    output.style.color="red";
});

document.getElementById("clearBtn").addEventListener("click",function(){
    sessionStorage.clear();
    output.textContent="Cleared all elements";
    output.style.color="red";
});
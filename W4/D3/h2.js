const themeInput=document.getElementById("themeInput");
const output=document.getElementById("output");

document.getElementById("saveBtn").addEventListener("click",function(){
    localStorage.setItem("theme",themeInput.value);
    localStorage.setItem("UserName","Harsha");
    localStorage.setItem("LoggedIn",true);
    console.log("Saved theme: ",themeInput.value);
    output.textContent="Save theme to localStorage";
    output.style.color="green";
});

document.getElementById("readBtn").addEventListener("click",function(){
    localStorage.getItem("theme",themeInput.value);
    output.textContent="Save theme to localStorage";
    output.style.color="green";
});

document.getElementById("removeBtn").addEventListener("click",function(){
    localStorage.removeItem("loggedIn");
    output.textContent="Removed:loggedIn";
    output.style.color="red";
});

document.getElementById("clearBtn").addEventListener("click",function(){
    localStorage.clear();
    output.textContent="Cleared all elements";
    output.style.color="red";
});
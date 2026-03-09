const form=document.getElementById("loginForm");
const username=document.getElementById("userName");
const message=document.getElementById("message")

form.addEventListener("sumbit",function(event){
    // stop page reload
    event.preventDefault();

    if(username.value.trim()===""){
        message.textContent="Username is required";
        console.log("Form BLOCKED : no input for username");
        return;
    }
    message.textContent="Form handled by JS for user",username.value;
    console.log("Form sumbitted with username",username);
});
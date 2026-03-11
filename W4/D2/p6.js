const livePassword=document.getElementById("livePassword");
const message=document.getElementById("message");

livePassword.addEventListener("input",function(){
    // Password validation
    const Password=livePassword.value;
    if(!Password){
        message.textContent="password is required";
        message.style.color="red"; 
        livePassword.focus();
        return;
    }
    if(Password.length<8){
        message.textContent="password must be 8 characters long";
        message.style.color="red";
        livePassword.focus();
        return;
    }
    // check UPPERCASE characters
    if(!/[A-Z]/.test(Password)){
        message.textContent="password must atleast 1 UPPERCASE letter";
        message.style.color="red";
        livePassword.focus();
        return;
    }
    // check lowercase characters
    if(!/[a-z]/.test(Password)){
        message.textContent="password must atleast 1 lowercase letter";
        message.style.color="red";
        livePassword.focus();
        return;
    }
    // check number
    if(!/\d/.test(Password)){
        message.textContent="password must atleast 1 digit";
        message.style.color="red";
        livePassword.focus();
        return;
    }
    // check special characters
    if(!/[~@#%$&!]/.test(Password)){
        message.textContent="password must atleast 1 special characters";
        message.style.color="red";
        livePassword.focus();
        return;
    }

    message.textContent="Valid email and password entered"
    message.style.color="green";
    console.log("Success!",{email,Password});
});
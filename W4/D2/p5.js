// 'event' is an object that has many properties
const signupForm=document.getElementById("signupForm");
const signupEmail=document.getElementById("signupEmail");
const signupPassword=document.getElementById("signupPassword");
const message=document.getElementById("message");

signupForm.addEventListener("submit",function(event){
    event.preventDefault();

    // email validation
    const email=signupEmail.value;
    if(!email){
        message.textContent="Email is required";
        message.style.color="red";
        signupEmail.focus();
        return;
    }
    if(!email.includes("@") || !email.includes(".")){
       message.textContent="Enter valid email id";
       message.style.color="red";
       signupEmail.focus();
       return; 
    }

    // Password validation
    const password=signupPassword.value;
    if(!password){
        message.textContent="password is required";
        message.style.color="red";
        signupPassword.focus();
        return;
    }
    if(password.length<8){
        message.textContent="password must be 8 characters long";
        message.style.color="red";
        signupPassword.focus();
        return;
    }
    // check UPPERCASE characters
    if(!/[A-Z]/.test(password)){
        message.textContent="password must atleast 1 UPPERCASE letter";
        message.style.color="red";
        signupPassword.focus();
        return;
    }
    // check lowercase characters
    if(!/[a-z]/.test(password)){
        message.textContent="password must atleast 1 lowercase letter";
        message.style.color="red";
        signupPassword.focus();
        return;
    }
    // check number
    if(!/\d/.test(password)){
        message.textContent="password must atleast 1 digit";
        message.style.color="red";
        signupPassword.focus();
        return;
    }
    // check special characters
    if(!/[~@#%$&!]/.test(password)){
        message.textContent="password must atleast 1 special characters";
        message.style.color="red";
        signupPassword.focus();
        return;
    }

    message.textContent="Valid email and password entered"
    message.style.color="green";
    console.log("Success!",{email,password:"***Hidden***"});
});
// Clear message on input
signupEmail.addEventListener("input",()=>message.textContent="");
signupPassword.addEventListener("input",()=>message.textContent="");
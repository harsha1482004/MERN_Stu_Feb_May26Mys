const signupForm=document.getElementById("signupForm");
const signupEmail=document.getElementById("signupEmail");
const signupPassword=document.getElementById("signupPassword");
const confirmPassword=document.getElementById("confirmPassword");
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
        message.textContent="Password is required";
        message.style.color="red";
        signupPassword.focus();
        return;
    }
    if(password.length<8){
        message.textContent="Password must be 8 characters long";
        message.style.color="red";
        signupPassword.focus();
        return;
    }
    // check UPPERCASE characters
    if(!/[A-Z]/.test(password)){
        message.textContent="Password must have atleast 1 UPPERCASE letter";
        message.style.color="red";
        signupPassword.focus();
        return;
    }
    // check lowercase characters
    if(!/[a-z]/.test(password)){
        message.textContent="Password must have atleast 1 lowercase letter";
        message.style.color="red";
        signupPassword.focus();
        return;
    }
    // check number
    if(!/\d/.test(password)){
        message.textContent="Password must have atleast 1 digit";
        message.style.color="red";
        signupPassword.focus();
        return;
    }
    // check special characters
    if(!/[~@#%$&!]/.test(password)){
        message.textContent="Password must have atleast 1 special character (~@#%$&!)";
        message.style.color="red";
        signupPassword.focus();
        return;
    }

    // confirm password validation
    const password2=confirmPassword.value;
    if(!password2){
        message.textContent="Please confirm your password";
        message.style.color="red";
        confirmPassword.focus();
        return;
    }
    if(password!==password2){
        message.textContent="Passwords do not match";
        message.style.color="red";
        confirmPassword.focus();
        return;
    }

    // All validations passed
    message.textContent="Valid email and password entered";
    message.style.color="green";
    console.log("Success!",{email,password:"***Hidden***"});
});

// Clear message on input
signupEmail.addEventListener("input",()=>message.textContent="");
signupPassword.addEventListener("input",()=>message.textContent="");
confirmPassword.addEventListener("input",()=>message.textContent="");
 function tagPassword(password){
    if(typeof password!=="string"){
        return "INVALID";
    }
    else{
     if (password.length < 8){
        return "WEAK";
     }
     else if(password.length>=8){
        return "MEDIUM";
     }
     else if(password.length>=12){
        return "STRONG";
     }
    }
 }
 console.log(tagPassword("12436718"));
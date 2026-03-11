const jsonOutput=document.getElementById("jsonOutput");

document.getElementById("saveBtn").addEventListener("click",function(){
    const user={
        id:101,
        name:"Rahul",
        role:"Designer",
        skills: ["Html","css","JS"]
    };
    localStorage.setItem("userProfile",JSON.stringify(user));
    jsonOutput.textContent="User object saved as string to localstorage";
    
});
document.getElementById("readBtn").addEventListener("click",function(){
    try {
        const up = localStorage.getItem("userProfile");
        console.log(JSON.parse(up));
        console.log(up)
        jsonOutput.textContent = "userProfile" + up;
    }
    catch(error){
        jsonOutput.textContent="JSON parsing"
    }
});
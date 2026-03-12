const asyncFetchBtn=document.getElementById("asyncFetchBtn");
const output=document.getElementById("output");

asyncFetchBtn.addEventListener("click",async function(){
    try {
        const respone = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!respone.ok) throw new Error("HTTP Error: " + respone.status);
        const users = await respone.json();
        console.log(users)
        output.textContent=JSON.stringify(users,null,1)

        const firstThree=users.slice(0,3);
        output.textContent=JSON.stringify(firstThree,null,2)
    }
    catch(error){
        output.textContent="Error: "+error.message;
    }
});
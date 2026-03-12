const asyncFetchBtn=document.getElementById("asyncFetchBtn");
const output=document.getElementById("output");

asyncFetchBtn.addEventListener("click",async function(){
    output.textContent="Loading User .....";
    try {
        const respone=await fetch("https://jsonplaceholder.typicode.com/posts");
        if(!respone.ok)throw new Error("http error:"+respone.status);
        const data=await respone.json();
        output.textContent=JSON.stringify(data,null,2);
    }
    catch (error) {
        output.textContent="Error: "+error.message;
    }
});
const asyncFetchBtn=document.getElementById("asyncFetchBtn");
const output=document.getElementById("output");
const postIdOutput=document.getElementById("postIdOutput");

asyncFetchBtn.addEventListener("click",async function(){
    output.textContent="Loading User .....";
    const id=postIdOutput.value.trim();
        if(id===""){
            output.textContent="Post Id is required"
            return;
        }
        const numericId=Number(id);
        if(numericId<1 || numericId>100){
            output.textContent="Post id must be in the range of 1-100"
            return;
        }
        else{
            output.textContent="Valid input";
        }
    try {
        output.textContent="Fetching post..."
        const respone=await fetch("https://jsonplaceholder.typicode.com/posts/"+numericId);
        if(!respone.ok)throw new Error("http error:"+respone.status);
        const data=await respone.json();
        output.textContent=JSON.stringify(data,null,2);
    }
    catch (error) {
        output.textContent="Error: "+error.message;
    }
});
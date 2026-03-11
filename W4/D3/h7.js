const existingPostBtn=document.getElementById("existingPostBtn");
const missingPostBtn=document.getElementById("missingPostBtn");
const statusOutput=document.getElementById("statusOutput");

function fetchPost(url){
    statusOutput.textContent="fetching from "+url;
    fetch(url)
    .then(function(respone){
        if(!respone.ok){
            throw new Error("HTTP error & status code: "+respone.status);
        }
        return respone.json();
    })
    .then(function(data){
        statusOutput.textContent="Success: "+JSON.stringify(data,null,2);
    })
    .catch(function(error){
        statusOutput.textContent="Error: "+error.message;
    });
}
existingPostBtn.addEventListener("click",function(){
    fetchPost("https://jsonplaceholder.typicode.com/posts/10");
});
missingPostBtn.addEventListener("click",function(){
    fetchPost("https://jsonplaceholder.typicode.com/posts/101");
});
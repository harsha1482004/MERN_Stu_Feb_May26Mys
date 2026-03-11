const introBtn=document.getElementById("introBtn");
const output=document.getElementById("output");

introBtn.addEventListener("click",function() {
    output.textContent="Sendig request...";
    fetch("https://jsonplaceholder.typicode.com/posts/10")
    .then(function(respone){
        return respone.inc();
    })
    .then(function(data){
        console.log("Raw response object: ",data);
        // output.textContent="Status:"+respod.status+"\nOk"+respod.ok;
        output.textContent=JSON.stringify(data,null,2);
    })
    .catch(function(error){
        output.textContent="Unexpected fetch"+error.message;
    });
});
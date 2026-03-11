const introBtn=document.getElementById("introBtn");
const output=document.getElementById("output");

introBtn.addEventListener("click",function() {
    output.textContent="Sendig request...";
    fetch("https://jsonplaceholder.typicode.com/posts/10")
    .then(function(respone){
        return respone.text()
    })
    .then(function(text){
        console.log("text response: ",text);
        output.textContent=text;
    })
    .catch(function(error){
        output.textContent="Unexpected fetch"+error.message;
    });
    
});
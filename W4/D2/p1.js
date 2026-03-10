// innertext and textContent
// innerText:visible renderded text only
// textcontent:all text nodes regardless of CSS
// innerHTML:allows reading or writing HTML markup inside an element

const message=document.getElementById("message");

document.getElementById("innerTextBtn").addEventListener("click",function(){
    message.innerText="Updated using innerText";
});

document.getElementById("textContentBtn").addEventListener("click",function(){
    message.innerText="Updated using textContentBtn";
});

document.getElementById("reset").addEventListener("click",function(){
    message.innerText="Original Message";
});

const box=document.getElementById("box");
document.getElementById("innerHTMLBtn").addEventListener("click",function(){
    box.innerHTML="<strong>Original</strong> Content";
});
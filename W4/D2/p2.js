// CreateElements() & appendChild()

const list=document.getElementById("list");
let counter=1;

document.getElementById("addBtn").addEventListener("click",function(){
    const li=document.createElement("li");
    li.textContent="Item"+ counter++;
    list.appendChild(li);
    errMessage.textContent=" ";
});

document.getElementById("remBtn").addEventListener("click",function(){
    
    if(list.lastElementChild){
        list.removeChild(list.lastElementChild);   
    }
    else{
        errMessage.textContent="No items to Remove";
    }
});
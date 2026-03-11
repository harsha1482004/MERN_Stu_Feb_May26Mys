const checkBtn=document.getElementById("checkBtn");

checkBtn.addEventListener("click",function(){
console.log("Local storage check",typeof localStorage!=="undefined");
console.log("Session storage check",typeof sessionStorage!=="undefined")
console.log("Local Storage object:",localStorage);
console.log("Session Storage object:",sessionStorage);

});
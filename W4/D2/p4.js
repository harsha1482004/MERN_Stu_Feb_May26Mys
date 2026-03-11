// 
const form=document.getElementById("studentForm");
const nameInput=document.getElementById("nameInput");
const emailInput=document.getElementById("emailInput");
const inspectbtn=document.getElementById("inspectBtn");
const terms=document.getElementById("terms");
const country=document.getElementById("country");

inspectbtn.addEventListener("click",function(){
    console.log("Form: ",form);
    console.log("Name: ",nameInput.value);
    console.log("Email:",emailInput.value);

    const selectedGender=document.querySelector('input[name="gender"]:checked');
    console.log("Gender: ",selectedGender?selectedGender.value:"not selected");
    console.log("Accepted terms:",terms.checked);
    console.log("country:",country.value);
});

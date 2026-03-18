// Handle the errors using try/catch block

function loadCustomerProfile(){
    return new Promise(function(resolve,reject){
        const isServiceAvailable =true;
        
        if(isServiceAvailable){
            resolve("Success! Customer loaded ")
        }
        else{
            reject("Error: Unsuccessfull Customer profile not available.")
        }
    })
}

async function showCustomerProfie(){
    try{
    const message=await loadCustomerProfile();
    console.log(message);
    }
    catch(err){
        console.log("Error:",err);
    }
}

showCustomerProfie();
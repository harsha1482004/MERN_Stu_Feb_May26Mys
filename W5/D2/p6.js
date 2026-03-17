// Callback hell
console.log("Starting nested callback flow");
setTimeout(function(){
    console.log("Step 1: User loaded.");

    setTimeout(function(){
        console.log("Step 2: Orders loaded.");

        setTimeout(function(){
            console.log("Step 3: Payments loaded.");

            setTimeout(function(){
                console.log("Step 4: Shipment loaded.");
                console.log("We are in callback hell!!");
            },1000);
        },800);
    },600);
},400);
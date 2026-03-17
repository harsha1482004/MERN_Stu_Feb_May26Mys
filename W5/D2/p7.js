// callback Handling with named functions
function loaduser(next){
    setTimeout(function(){
        console.log("Step 1: User loaded.");
        next();
    },400);
}
function loadOrders(next){
    setTimeout(function(){
        console.log("Step 2: Orders loaded.");
        next();
    },400);
}
function loadPayment(next){
    setTimeout(function(){
        console.log("Step 3: Payments loaded.");
        next();
    },400);
}
function loadShipment(){
    setTimeout(function(){
        console.log("Step 4: Shipment loaded.");
        console.log("Same flow but easier to read");
    },400);
}
loaduser(function(){
    loadOrders(function(){
        loadPayment(function(){
            loadShipment();
        });
    });
});
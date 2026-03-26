// Using the Event Emitter class
const EventEmitter = require("events"); //Inbuilt module or libraries    // for third party module install it to install use command npm install lodash

// create a new event emitter instance 
// This object can publish events and allow listeners to subscribe
const orderEmitter = new EventEmitter(); 

// Register a listener for the "orderPlaced" event.
// Whenever the event is emitted the function will execute
// once() rigesters a listeners that automatically removes itself after running for the first time.
orderEmitter.once("orderPlaced",function(orderId,name,orderValue){  // for listen use on()
    console.log("Bill Amount",orderValue);
    console.log("Waiting for Restaurant to accept order.",orderId);
});

orderEmitter.on("orderPlaced",function(orderId,custuomerName){  // for listen use on()
    console.log("Hello",custuomerName);
    console.log("Restaurant accepted Your order.",orderId);
});

orderEmitter.on("orderPlaced",function(orderId,custuomerName){  // for listen use on()
    console.log("Hello",custuomerName);
    console.log("Assigning delivery partner",orderId);

});

orderEmitter.on("orderPlaced",function(orderId,custuomerName){  // for listen use on()
    console.log("Hello",custuomerName);
    console.log("Rajesh is delivering your order ",orderId);
});

// Emit the event with extra data
// The listener receives the orderId value.
orderEmitter.emit("orderPlaced","ORD-2403001","Harsha",10000);
orderEmitter.emit("orderPlaced","ORD-2403001","Harsha",10000);
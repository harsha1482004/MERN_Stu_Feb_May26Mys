// Combine multiple promise based steps with async/await

function getOrderID(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(501);
        },1000)
    })
};

function getOrderDetails(orderID){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve({
                id:orderID,
                product:"Laptop",
                quantity:2
            },1500)
        })
    })
}

async function showOrderSummary() {
    const order= await getOrderID();
    console.log("Order Id: ",order);

    const orderDetails=await getOrderDetails(order);
    console.log("Product: ",orderDetails.product);
    console.log("Quantity: ",orderDetails.quantity)
}

showOrderSummary();
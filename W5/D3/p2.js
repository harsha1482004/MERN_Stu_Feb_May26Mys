// Why use async/await

function getUser(){
    return new Promise(function(resolve,){
        setTimeout(function(){
            resolve({id:101,name:"kiran"});
        },1000);
    });
}

function getOrders(userID){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(["order-A,order-b"])
        },1400)
    })
}

async function showUserAndOrders(){
    const user =await getUser();
    console.log("User loaded: ",user.name);

    const orders=await getOrders(user.id);
    console.log("Orders loaded",orders);
}

showUserAndOrders();
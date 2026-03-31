// Basics of Express.JS - setup
// npm init -y
// npm install express

// Import module os express
const express=require("express");

// Calling express() creates the main application object
// This object is used to register routes and middlewaew
const app=express();

// app.get() handles GET requests for a specific path
app.get("/",function(req,res){
    // res.send() sends a response body & ends the request automatically
    res.send("Hello From Express Server");
});

// Listen() starts the server on a choosen port number
app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
})
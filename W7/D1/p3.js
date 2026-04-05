// Handling different HTTP methods in express
const express = require("express");

const app = express();
// to read 
app.get("/users",function(req,res){
    res.status(200).json([{message:"success"},
        {id:1,name:"Puneeth"},
        {id:2,name:"Jeevan"},
        {id:3,name:"Harsha"}
    ])
     res.send("Returning all Users");
});
// to create
app.post("/users",function(req,res){
    // res.status() sets the HTTP status code before sending the response body
    res.status(201).send("User created");
});

app.listen(4009,function(){
    console.log("Express server running at http://localhost:4009");
});
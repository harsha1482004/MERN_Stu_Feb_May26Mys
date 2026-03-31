// Basic routing in express
const express=require("express");
const app=express();

app.get("/",function(req,res){
    res.send("Home route in Express Server");
});

app.get("/about",function(req,res){
    res.send("About route in Express Server");
});

app.get("/products",function(req,res){
    res.send("Products route in Express Server");
});


app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
})
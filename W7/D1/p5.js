//Middleware order and route-specific middleware
//MiddleWare usage in Express.
//Middleware runs durig the req-res cycle.
//Middleware can inspect or change the req before a route res.
//next() this passes controles to the next step.
const express=require("express");

const app=express();

//Global middleware this runs for every req
app.use(function(req,res,next){
    console.log("Global middleware",req.method,req.url);
    next();
})
app.get("/",function(req,res){
    res.send("Home route.");
});

app.get("/admin",function(req,res,next){
    console.log("Route specific middleware for /admin");
    next();
},function(req,res){
    res.send("Admin route reached.")
})
app.listen(4001,function(){
    console.log("Express server running at http://localhost:4001")
});
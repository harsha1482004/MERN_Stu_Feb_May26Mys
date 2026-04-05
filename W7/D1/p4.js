//MiddleWare usage in Express.
//Middleware runs durig the req-res cycle.
//Middleware can inspect or change the req before a route res.
//next() this passes controles to the next step.
const express=require("express");

const app=express();

//app.use() registers middleware.
//this middleware runs for every incoming req.
app.use(function(req,res,next){
    console.log("Request received",req.method,req.url);
    //next() is required whn this midleware does'nt finish the response
    next();
})
app.get("/",function(req,res){
    //res.send() sends a response body and ends the req automatically
    res.send("Middleware executed before the route.");
});
app.listen(4001,function(){
    console.log("Express server running at http://localhost:4001")
});
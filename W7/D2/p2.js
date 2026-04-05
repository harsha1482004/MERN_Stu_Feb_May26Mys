// Third-party middleware are available @ npm registry
const express=require("express");

// Middleware to log all the requests
const morgan=require("morgan");

const cors=require("cors") ;

const app=express();

app.use(morgan("dev"));  //Used in the development phases
app.use(cors());     //used in development and production server

app.get("/",function(req,res){
    res.json({
        messaage:"Third-party middleware executed before this response"
    })
})

app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
});

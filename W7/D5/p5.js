// Assigning roles to users and restricting access
const express=require("express");
const app=express();

app.use(function(req,res,next){
    req.user={
        id:101,
        username:"Harsha",
        role:"admin"
    };
    next();
});

function requireRoll(role){
    return function(req,res,next){
        if(!req.user){
            return res.status(401).json({
                success:false,
                message:"Authenticatin required"
            });
        }
        if(req.user.role!==role){
            return res.status(403).json({
                success:false,
                message:"Insuffcient permission"
            });
        }
        next();
    }
}

app.get("/profile",function(req,res){
    res.json({
        success:true,
        message:"Profile Page",
        user:req.user
    });
});

app.get("/admin",requireRoll("admin"),function(req,res){
    res.json({
        success:true,
        message:"Profile Page",
        user:req.user
    });
});

app.listen(4000, function () {
    console.log("Express session server running at http://localhost:4000");
});
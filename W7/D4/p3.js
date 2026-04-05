// Secure cookies with httpONly & secure key

const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();
app.use(cookieParser());

app.get("/set-session",function(req,res){
    const isProduction=process.env.NODE_ENV==="production";
    res.cookie("sessionId","demo-session-123",{
        httpOnly:true,
        secure:isProduction,
        message:30*60*1000
    });
    res.send("Session cookie set with httpOnly & environment secure flag");
});

app.get("/read-session",function(req,res){
    res.json({
        message:"Server can read the cookie value from the request",
        sessionId:req.cookies.sessionId || "No session cookie found"
    });
});

app.listen(4000, function () {
    console.log("Cookie server running at http://localhost:4000");
});



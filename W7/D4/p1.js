// Basics of cookies

const express = require("express");
const app=express();

app.get("/set-theme",function(req,res){
    // re.cookie() tells the browser to store a cookie
    res.cookie("theme","dark");

    res.send("cookie named 'theme' with the value dark was sent to the browser");
});

app.listen(4000, function () {
    console.log("JWT protected route server running at http://localhost:4000");
});
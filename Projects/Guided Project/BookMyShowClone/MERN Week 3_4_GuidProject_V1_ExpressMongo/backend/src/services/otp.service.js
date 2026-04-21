const OTP=require("../models/OTP");
const bcrypt=require("bcrypt");

// Generate OTP
exports.generateOTP=async(email)=>{
    const otp=Math.floor(100000+Math.random()*900000).toString();   
    // Task: generate otp by crypto method
    const hashedOTP=await bcrypt.hash(otp,10);
    const expiresAt=new Date(Date.now()+5*60*1000);

    await OTP.create({
        email,
        otp:hashedOTP,
        expiresAt
    });

    console.log("Generated OTP: ",otp);  // Testing only
    return otp;
}
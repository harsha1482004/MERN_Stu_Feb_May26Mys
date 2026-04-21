const user = require("../models/User");
const OTP = require("../models/OTP");
const otpService = require("./otp.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register user
exports.registerUser = async ({name,email,password}) => {
    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new Error("User alredy exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    await otpService.generateOTP(email);
    return {email:user.email};
};

// Verify OTP
exports.verifyOTP = async({email,otp})=>{
    const record = await OTP.findOne({email}).select("+otp");

    if(!record){
        throw new Error("OTP expired or not found");
    }

    const isMatch = await bcrypt.compare(otp,record.otp);

    if(!isMatch){
        record.attempts +=1;
        await record.save();
        throw new Error("Invalid OTP");

    }

    await User.updateOne({email},{isVerified:true});
    return true;
};
// Login
exports.loginUser = async ({email,password}) => {
    const user = await User.findOne({email}).select("+password");

    if(!user){
        throw new Error("User not Found");
    }

    if(!user.isVerified){
        throw new Error("User not Verified");
    }

    const isMatch = await user.comparePassword(password);

    if(!isMAtch){
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        {id:user._id,role:user},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );
    return{
        token,
        user:{
            id:user._id,
            role:user.role
        },
    };
};
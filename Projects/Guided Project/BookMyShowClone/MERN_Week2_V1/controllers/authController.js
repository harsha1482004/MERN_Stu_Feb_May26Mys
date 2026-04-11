// User login, profile fetch and logout of user functionality created
const jwt= require("jsonwebtoken");
const users = require("../data/users");
const CustomError = require("../utils/customError");
const {JWT_SECRET} = require("../middleware/authMiddleware");

function loginUser(req,res,next){
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return next(new CustomError("Email and password are required.",400));
        }
        const user=users.find(u=>u.email === email && u.password === password);

        if(!user){
            return next(new CustomError("Invalid email or password.",401));
        }
        const token = jwt.sign({
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        },JWT_SECRET,{expiresIn:"30m"});
        res.cookie("token",token,{
            httpOnly:true,
            secure: false,
            maxAge: 60*60*1000
        });
        req.session.user = {
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        };
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });
    } 
    catch(error){
        console.log(error);
        
        next(error);
    }
}

function logoutUser(req,res,next){
    try {
        req.session.destroy((err) => {
            res.clearCookie("token");
            res.status(200).json({
                success: true,
                message: "Logout successful"
            });
        });
    } 
    catch(error) {
        next(error);
    }
}

function getProfile(req,res,next){
    try {
        res.status(200).json({
            success: true,
            message: "Login successful",
            user:req.user,
            sessionUser:req.sessionUser || null
        });
    } 
    catch (error) {
        next(error);
    }
}

module.exports={
    loginUser,
    logoutUser,
    getProfile
};
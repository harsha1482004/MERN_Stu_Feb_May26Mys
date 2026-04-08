// Checks the permission for the req  & allow it or reject it

const CustomError = require("../utils/customError");

function roleMiddleware(...allowedRoles){
    return function(req,res,next){
        if(!req.user){
            return next(new CustomError("Access denied. No token provided.",401));
        }

        if(!allowedRoles.includes(req.user.role)){
            return next(new CustomError("Forbidden: you do not have access to this resource.",403));
        }
        next();
    };
}

module.exports = roleMiddleware;
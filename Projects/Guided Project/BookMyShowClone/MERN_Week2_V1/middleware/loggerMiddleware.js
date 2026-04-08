// Middleware to request log.

function loggerMiddleware(req,res,next){
    console.log(`$(req.method) $(req.originalUrl)`);
    next();
}

module.exports = loggerMiddleware;

// Task: write a log to a file along with timestamp 
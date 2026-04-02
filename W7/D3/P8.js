// JWT flow with login,refresh-style logic and secure verifiction
const jwt = require("jsonwebtoken");
const express = require("express");

const app = express();
app.use(express.json());

const secretKey = "MySecretKey";
const refreshSecretKey = "MyRefreshSecretKey";

// In-memory storage for refresh token
const refreshTokens = [];

//  Middleware
function authenticateAccessToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Bearer token is missing."
        });
    }

    try {
        req.user = jwt.verify(token, secretKey, {
            algorithms: ["HS256"],
            issuer: "jwt-example"
        });
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Access token has expired"
            });
        }
        return res.status(401).json({
            success: false,
            message: "Access token is invalid"
        });
    }
}

//  LOGIN
app.post("/login", function (req, res) {
    const { email, password } = req.body;

    if (email !== "email@email.com" || password !== "pass@123") {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    const accessToken = jwt.sign(
        { userId: 101, email: email, role: "member" },
        secretKey,
        {
            expiresIn: "10m", algorithm: "HS256", issuer: "jwt-example"
        }
    );

    const refreshToken = jwt.sign(
        { userId: 101, email: email },
        refreshSecretKey,
        {
            expiresIn: "10d", 
            algorithm: "HS256",
            issuer: "jwt-example"
        }
    );

    refreshTokens.push(refreshToken);

    res.json({
        success: true,
        message: "Login successfully",
        accessToken: accessToken,
        refreshToken: refreshToken
    });
});

//  REFRESH TOKEN
app.post("/refresh", function (req, res) {
    const {refreshToken} = req.body;

    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(401).json({
            success: false,
            message: "Refresh token is missing or invalid"
        });
    }

    try {
        const decoded = jwt.verify(refreshToken, refreshSecretKey, {
            algorithms: ["HS256"],
            issuer: "jwt-example"
        });

        const newAccessToken = jwt.sign(
            {
                userId: decoded.userId,
                email: decoded.email,
                role: "member"
            },
            secretKey,
            {
                expiresIn: "10m",
                algorithm: "HS256",
                issuer: "jwt-example"
            }
        );

        res.json({
            success: true,
            message: "Token refreshed successfully",
            accessToken: newAccessToken
        });
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Refresh token is invalid"
        });
    }
});

// PROTECTED ROUTE
app.get("/me", authenticateAccessToken, function (req, res) {
    res.json({
        success: true,
        message: "Protected user route",
        user: req.user
    });
});

// SERVER
app.listen(4000, function () {
    console.log("JWT protected route server running at http://localhost:4000");
});

// Command lines
// curl -X POST http://localhost:4000/login -H "Content-Type:application/json" -d "{\"email\":\"email@email.com\",\"password\":\"pass@123\"}"
// curl -X POST http://localhost:4000/refresh -H "Content-Type:application/json" -d "{\"refreshToken\":\"_____\"}"
// curl http://localhost:4000/me -H "Authorization:bearer ________________"  //in ___ add access token
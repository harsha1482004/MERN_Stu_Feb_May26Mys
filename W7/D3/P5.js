// JWT Fundamentals: token generation and verification
const jwt=require("jsonwebtoken");

const secretKey="monkey123";

// payload holds small non-sensative data
const payload ={
    userId:101,
    role:"admin"
};

// jwt.sign() creates a signed JWT token
const token=jwt.sign(payload,secretKey,{expiresIn:"1h"});

console.log("Token generated successfully\n",token);

const tokenParts=token.split(".");
console.log("Header section:",tokenParts[0]);
console.log("Payload section:",tokenParts[1]);
console.log("Signature section:",tokenParts[2]);
console.log("JWT part count:",tokenParts.length);

try {
    // jwt.verify() checks trust, signature and expiration 
    const verifiedPayload=jwt.verify(token,secretKey);
    console.log("Verified Payload",verifiedPayload)
}
catch (error) {
    console.log("Verification Failed",error.message);
}

const decodedWithoutVerification=jwt.decode(token);
console.log("Decoded token:",decodedWithoutVerification);
const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/auth.middleware");

// User booking routes
router.post("/",protect,(req,res)=>{
    res.send("Create booking");
});

module.exports = router;
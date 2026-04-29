// TTL (Time-to-live)
const mongoose = require('mongoose');

async function main(params){
    try {
        await mongoose.connect('mongodb://localhost:27017/datedb');
        console.log("MongoDB connected");

        const optSchema=new mongoose.Schema({
            code:String,
            createdAt:{
                type:Date,
                default:Date.now,
                expires:30   //30 secs
            }
        });

        const OTP=mongoose.model('OTP',optSchema);
        await OTP.deleteMany();

        await OTP.create({code:"999999"});
        console.log("OTP created.")
    } 
    catch (error) {
        console.log("Error:",error.message);
    }
    finally{
        await mongoose.disconnect();
        console.log("Db disconnected");
    }
}
main();

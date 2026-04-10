// Connecting to mongoDB to NodeJs using Mongoose and defining Schema & models
const mongoose=require("mongoose");

async function main(){
    try{
        await mongoose.connect("mongodb://localhost:27017/abcmern");
        console.log("MongoDB connected successfully");

        const userSchema=new mongoose.Schema({
            name:String,
            age:Number,
            role:String
        });
        
        const User=mongoose.model("User",userSchema);

        console.log("mongoose schema & model created succesfully");
        console.log("Model Name:",User.modelName);

        await mongoose.connection.close();
        console.log(("Connection closed"));

    }
    catch(error){
        console.log("Failed to connect to DB",error.message)
    }
};
main();
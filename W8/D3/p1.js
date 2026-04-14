// Validation and schema constraints

const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    role:{
        type:String,
        enum:["admin","user","manager"]
    },
    email:{
        type:String,
        match:/.+@.+\..+/
    }
});
const User=mongoose.model("HookValidationUser",userSchema);

async function runValidationDemo() {
    try{
        const invaildUser=new User({
            name:"Harsha",
            age:19,
            role:"admin",
            email:"h@e.com"
        });
        await invaildUser.validate();
    }
    catch(error){
        console.log("Validation errors found:");

        for(const fieldName in error.errors){
            console.log(fieldName+":"+error.errors[fieldName].message)
        }
    }
}
runValidationDemo();
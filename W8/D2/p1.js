// Virtual fields in mongoose
const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
            firstName:String,
            lastname:String,
            email:String
        },
        {
            // This allows virtual to appear when converting documents to JSON or objects
            toJSON:{virtuals:true},
            toObject:{virtuals:true}
        }
    );
    
    // A virtual field is not stored on MongoDB
    // It is computed dynamically from exsisting stored fields

    userSchema.virtual("fullname").get(function(){
        return this.firstName +" "+this.lastname;
    });

    const User=mongoose.model("VirtualUser",userSchema);

    const user=new User({
        firstName: "Harsha",
        lastname: "Vardhan",
        email:"h@else.com"
    });

    console.log("Hello, ",user.fullname);
    console.log("Odjects output includes virtual ",user.toObject());
// Timestamp and Advanced queries 
const mongoose = require('mongoose');

async function main() {
    try{
        await mongoose.connect('mongodb://localhost:27017/datedb');
        console.log("MongoDB connected");

        const demoSchema=new mongoose.Schema(
            {
                name:String
            },
            {
                timestamps:true
            }
        );
        const Model=mongoose.model('LogTime',demoSchema);
        // await Model.deleteMany();
        // await Model.create([
        //     {name:"Harshal"},
        //     {name:"Sandeep"},
        //     {name:"Prasidh"},
        // ]);
        const recent=await Model.find({
            createdAt:{
                $gte:new Date(Date.now()-900000)
            }
        }).sort({createdAt:-1});
        console.log("Recent:",recent)
    } 
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
    finally{
        await mongoose.disconnect();
        console.log("Db disconnected");
    }
}
main()
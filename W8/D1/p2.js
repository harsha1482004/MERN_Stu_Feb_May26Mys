const mongoose=require("mongoose");
async function runCRUDdemo(){
    try {
        await mongoose.connect("mongodb://localhost:27017/abcmern");
        console.log("MongoDB connected successfully");

        const studentSchema = new mongoose.Schema({
            name: String,
            age: Number,
            role: String
        });

        const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
        // Clearing previous demo data
        await Student.deleteMany({ role: "demo-student" });

        // Create using save()
        const firstStudent = new Student({
            name: "Harsha",
            age: 21,
            role: "demo-student"
        });
        await firstStudent.save();
        console.log("Created new student with save()", firstStudent);

        // Create using create()
        const secondStudent = await Student.create({
            name: "Vipul",
            age: 22,
            role: "demo-student"
        });
        console.log("Created new student with create()", secondStudent);

        // Read using find()
        const allDemoStudents=await Student.find({role:"demo-student"});
        console.log("Read with find():",allDemoStudents);

        // Read using findOne()
        const oneDemoStudents=await Student.findOne({name:"Vipul"});
        console.log("Read with findOne():",oneDemoStudents);

        // Update using findByIdAndUpdate()
        const updateStudent=await Student.findByIdAndUpdate(
            secondStudent._id,
            {age:24},
            {new:true}
        );
        console.log("Updated with findByIdAndUpdate():",updateStudent);

        // Delete using findByIdAndDelete()
        const deleteStudent=await Student.findByIdAndDelete(firstStudent._id);
        console.log("Deleted with findByIdAndDelete():",deleteStudent);

        await mongoose.connection.close();
        console.log(("Connection closed"));
    }
    catch(error){
        console.log("CRUD demo error",error.message);
    }
};
runCRUDdemo();
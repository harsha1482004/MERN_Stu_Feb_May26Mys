// Creating saving & deleting
const mongoose = require("mongoose");

async function runRemovehookDemo() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/hooks");

        const courseSchema = new mongoose.Schema({
            title: String,
            tag: String
        });

        courseSchema.pre(
            "deleteOne",
            {
                document: true,
                query: false
            },
            function () {
                console.log("pre-delete hook:", this.title);
            }
        );

        const CourseModel =
            mongoose.models.HookCourse ||
            mongoose.model("HookCourse", courseSchema);

        const course = new CourseModel({
            title: "database design",
            tag: "remove hook demo"
        });

        await course.save();
        console.log("document saved successfully");

        await course.deleteOne();
        console.log("document deleted successfully");

        await mongoose.connection.close();
        console.log("connection closed successfully");

    } catch (error) {
        console.log("remove hook error:", error.message);
    }
}

runRemovehookDemo();
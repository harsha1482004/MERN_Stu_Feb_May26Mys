const mongoose = require("mongoose");
async function demo() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/abcmern");//to connect with DB
        console.log("MongoDB connected successfully");

        // const productSchema = new mongoose.Schema({
        //     name:String,
        //     price:Number,
        //     category:String,
        //     description: String,
        //     stock:Number,
        //     tag:String
        // });

        const userSchema = new mongoose.Schema({
            firstName: String,
            lastName: String,
            email: { type: String, indexing: true },
            username: { type: String, unique: true },
            role: String,
            createdAt: Date,
            tag: String
        },
            {
                toJSON: { virtuals: true },
                toObject: { virtuals: true }
            });
        // Compound index
        // Query filter by role and sort by created
        userSchema.index({ role: 1, createdAt: -1 });


        //A virtual field is not stored on MongoDB. it is computed dynamically from existing stored fields
        userSchema.virtual("fullname").get(function () {
            return this.firstName + " " + this.lastName;
        });

        const User = mongoose.models.PerformanceUser || mongoose.model("PerformanceUser", userSchema);

        await User.deleteMany({ tag: "demo-example" });
        await User.deleteMany({ tag: "demo-example1" });
        await User.create([
            {
                firstName: "Harsha",
                lastName: "Vardhan",
                email: "h@s.com",
                username: "hv123",
                role: "user",
                createdAt: new Date("2026-04-09"),
                tag: "demo-example1"
            },
            {
                firstName: "Jeevan",
                lastName: "ns",
                email: "j@j.com",
                username: "jns123",
                role: "admin",
                createdAt: new Date("2026-04-01"),
                tag: "demo-example"
            },
            {
                firstName: "pavan",
                lastName: "yh",
                email: "p@p.com",
                username: "pyh123",
                role: "user",
                createdAt: new Date("2026-04-02"),
                tag: "demo-example1"
            }
        ]);

        //filter,select,sort,lean
        const users = await User.find({ tag: "demo-example" })
            .select("firstName lastName  email  role  createdAt")
            .sort({ createdAt: -1 })
            .limit(2)
            .lean();
        console.log("Optimized user query result: ", users);
        const oneUser = await User.findOne({ email: "j@j.com", tag: "demo-example" });
        console.log("Virtual fullname:", oneUser.fullname);

        await mongoose.connection.close();
        console.log("Connection closed");

    }
    catch (error) {
        console.log("Aggregate demo error", error.message);
    }
}
demo();
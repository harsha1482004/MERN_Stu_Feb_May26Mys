// File upload using multer-with file type ,file size restinction
const express=require("express");
const multer=require("multer");

async function main() {
    try{
        const app=express();

        // mimetype: format of file
        const fileFilter=(req,file,callback)=>{
            if(file.mimetype==="image/png" || file.mimetype==="image/jpeg"){
                callback(null,true)
            }
            else{
                callback(new Error("Only PNG & JPEG imges are allowed."),false);
            }
        };
        // Approch 1: Using dest
        const uploadWithDest=multer({
            dest:"uploads/",
            limits:{fileSize:1024*1024*2}, // 2MB
            fileFilter
        });

        app.post("/upload-dest",uploadWithDest.single("file"),(req,res)=>{
            res.send({
                message:"Uploaded using dest approach",
                note:"Filename is random, no extension preserved",
                file:req.file
            });
        });

        // Approch 3: Using diskStorage
        const storage=multer.diskStorage({
            destination:(req,res,callback)=>{
                callback(null,"uploads/")     // Where to store the file
            },
            // How to name the file
            filename:(req,file,callback)=>{
                callback(null,Date.now()+"-"+file.originalname);
            }
        });
        const uploadWithDisk=multer({
            storage,
            limits:{fileSize:1024*1024*2}, // 2MB
            fileFilter
        });

        app.post("/upload-disk",uploadWithDisk.single("file"),(req,res)=>{
            res.send({
                message:"Uploaded using diskStorage approach",
                note:"Filename is controlled & extension is preserved",
                file:req.file
            });
        });

        app.listen(3000,()=>{
            console.log("Server running on port: http://localhost:3000");
            console.log(" POST/upload-dest");
        });
    } 
    catch(error){
        console.log("Error:",error.message);
    }
}
main();
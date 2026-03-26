//Reading and writing of the files asynchronously with fs/promises

const fs = require("fs/promises");
const path = require("path");

async function runPromisedBasedFileFlow() {
    const filePath = path.join(__dirname,"promises-note.txt");

    try{
        await fs.writeFile(filePath,"written using fs/promises.This works with async/await");
        console.log("file written using fs/promises");
       
        
        const content = await fs.readFile(filePath,"utf-8");
        console.log(content);
    }
    catch(error){
        console.log("promise-based fs error:",error.message);
        
    }

}
runPromisedBasedFileFlow();
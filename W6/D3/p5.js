//Renameing,deleting and checking the file existing
const fs  = require("fs");
const path = require("path");

const orignalPath = path.join(__dirname,"draft-report.txt");
const renamedPath = path.join(__dirname,"final-report.txt");

fs.writeFileSync(orignalPath,"Draft report content");
console.log("Does draft-report.txt exists?",fs.existsSync(orignalPath));

//Rename
fs.renameSync(orignalPath,renamedPath);
console.log("Does draft-report.txt exists?",fs.existsSync(orignalPath));

//delete file
fs.unlinkSync(renamedPath);
console.log("Does final-report.txt exists?",fs.existsSync(renamedPath));
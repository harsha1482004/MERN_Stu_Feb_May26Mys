// Basics NodeJS modules
const moduleTitle="nodeJs module basics";
function describeModule(){
    console.log("This file is its own module");
    console.log("Title:",moduleTitle);
    console.log("Local values stay inside the file unless exported");
}
describeModule(); //
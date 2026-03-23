// Usage of built-in and third party modules

const path=require("path");  // path is a built-in module, It works without installation

const invoicePath=path.join("invoices","2026","invoice_001.txt");
console.log("Built-in module usage:",invoicePath);

// to use third party modules
try{
    const _=require("lodash");
    console.log("Third party module Ex");
}
catch(err){
    console.log("Third party module 'lodash' is not installed")
}
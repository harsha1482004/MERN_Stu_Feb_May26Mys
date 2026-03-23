// Understanding path module and JSON maodule

const path=require("path");

// JSON is loaded as a normal JS object in CommonJS
const appConfig=require("./support/app-config.json");

console.log("__dirname",__dirname);
console.log("__filename",__filename);

console.log("Application Name:",appConfig.appName);
console.log("Feature:",appConfig.features.join(", ")); //join() Used to convert into objects
console.log("Environment:",appConfig.environment);
// Removing EventEmitter listener

const EventEmitter = require("events");
const jobEmitter = new EventEmitter();

function showJobProgress(status){
    console.log("Job Status:",status);
};

// add listener
jobEmitter.on("Progress",showJobProgress);

// Emit the event
jobEmitter.emit("Progress","50% Completed");

// Remove the listener
jobEmitter.off("Progress",showJobProgress);

// Emit the event
jobEmitter.emit("Progress","100% Completed");
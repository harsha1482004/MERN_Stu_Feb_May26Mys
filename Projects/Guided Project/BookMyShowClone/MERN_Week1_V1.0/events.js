// This file creates and exports custom EventEmitter instance

const EventEmitter=require("events");

// Custom EventEmitter object
const bookingEmitter=new EventEmitter();

module.exports=bookingEmitter;
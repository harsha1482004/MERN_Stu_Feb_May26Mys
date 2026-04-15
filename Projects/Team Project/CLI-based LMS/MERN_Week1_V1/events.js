const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("enroll", (msg) => {
  console.log(`${msg}`);
});

emitter.on("progress", (msg) => {
  console.log(`${msg}`);
});

emitter.on("withdraw", (msg) => {
  console.log(`${msg}`);
});

emitter.on("error", (msg) => {
  console.log(`${msg}`);
});

module.exports = emitter;
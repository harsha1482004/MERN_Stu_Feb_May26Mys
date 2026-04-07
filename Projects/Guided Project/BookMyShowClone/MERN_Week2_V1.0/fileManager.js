// Writing and reading bookings and its logs
const fs = require('fs');
const path = require('path');


const dataDir = path.join(__dirname, 'data');
const logDir=path.join(dataDir,"logs");
const bookingsFile=path.join(dataDir, 'bookings.json');
const logFile=path.join(logsDir,"booking.log");
const archivedLogFile=path.join(logsDir,"booking-archived.log");

function ensureDirectories() {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }
}

function listDataFilesSync() {
    ensureDirectories();
    return fs.readdirSync(dataDir);
}

function removeLogsDirectorySync(){
    if (fs.existsSync(logsDir)){
        fs.rmSync(logsDir, {recursive:true});
    }
}

// Readind and writing bookings
function intializeBookingsFileSync() {
    ensureDirectories();
    if (!fs.existsSync(bookingsFile)) {
        fs.writeFileSync(bookingsFile, JSON.stringify([],null,2),"utf-8");
    }
}

function readBookingsSync() {
    intializeBookingsFileSync();

    // Read synchronusly using buffer first, then convert to string
    const bufferData = fs.readFileSync(bookingsFile);
    const content = bufferData.toString("utf-8");

    return JSON.parse(content || "[]");
}

function readBookingsAsync() {
    intializeBookingsFileSync();
    return new Promise((resolve, reject) => {
        fs.readFile(bookingsFile,(err,bufferData)=>{
            if (err) {
                return reject(err);
            }
            try {
                const content = bufferData.toString("utf-8");
                const parsed= JSON.parse(content || "[]");
                resolve(parsed);
            } 
            catch (parseError) {
                reject(parseError);
            }
        });
    });
}

function writeBookingsAsync(bookings) {
    intializeBookingsFileSync();

    return new Promise((resolve, reject) => {
        const jsonString= JSON.stringify(bookings,null,2);
        const buffer=Buffer.alloc(Buffer.byteLength(jsonString));
        buffer.write(jsonString,"utf-8");

        fs.writeFile(bookingsFile, buffer, (err) => {
            if (err) {
                return reject(err);
            }
            resolve("Booking file written successfully");
        });
    });
}

async function appendBookingAsync(booking) {
    const bookings = await readBookingsAsync();
    bookings.push(booking);
    await writeBookingsASync(bookings);
    return booking;
}

function appendLogAsync(message){  
    ensureDirectories();
    return new Promise((resolve, reject) => {
        const timestamp=new Date().toISOString();
        const finalMessage=`[${timestamp}] ${message}\n`;
        fs.appendFile(logFile, finalMessage,"utf-8", (err) => {
            if (err) {
                return reject(err);
            }
            resolve("Log appened successfully");
        });
    });
}

function renameFileSync(){
    ensureDirectories();

    if(fs.existsSync(logFile)){
        fs.renameSync(logFile,archivedLogFile);
        return true;
    }
    return false;
}

function deleteArchivedLogSync(){
    if(fs.existsSync(archivedLogFile)){
        fs.unlinkSync(archivedLogFile);  // Unlink is used to delete a file in Node.js
        return true;
    }
    return false;
}

module.exports = {
    dataDir,
    logDir,
    bookingsFile,
    logFile,
    archivedLogFile,
    writeFileSync,
    ensureDirectories,
    listDataFilesSync,
    removeLogsDirectorySync,
    intializeBookingsFileSync,
    readBookingsSync,
    readBookingsAsync,
    writeBookingsAsync,
    appendBookingAsync,
    renameFileSync,
    deleteArchivedLogSync,
    appendLogAsync
}
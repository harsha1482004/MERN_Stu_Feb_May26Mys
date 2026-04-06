//Handles booking related operations 

const bookingEmitter = require("./events");

let currentBooking = null;
function getCurrentBooking(){
    return currentBooking;
}

function clearCurrentBooking(){
    currentBooking = null;
}

function checkDuplicateBooking(movie,showtime,seaCount){
    return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        if(
            currentBooking &&
            currentBooking.movie.id === movie.id &&
            currentBooking.showtime.time === showtime.time && 
            currentBooking.seatCount === seaCount
        ){
            return reject("Duplicate booking detected! You have already booked the same movie, showtime, and seat count combination.");
        } else {
            resolve("No duplicqate booking found. Proceeding with the booking process.");
        }
    },300);
    });
}

function checkSeatAvailability(showtime,seatCount){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(showtime.seatsAvailable < seatCount){
                return reject(`Only ${showtime.seatsAvailable} seats(s) are available `)
            }
            resolve("Seats are available.");
        },300);
    });
}

function generateBookingDetails(movie,showtime,seatCount){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const booking ={
                bookingId : `BOOK-${Date.now()}`,
                movieId: movie.id,
                movieTitle: movie.title,
                showtime:showtime.time,
                seatCount
            };
            resolve(booking);
        },300);
    });
}

function confirmBooking(booking,showtime){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            showtime.seatsAvailable -= booking.seaCount;
            currentBooking = booking;
            bookingEmitter.emit("bookingconfirmed",booking);
            resolve(booking);
        },300);
    });
}

//Promise chaining
function processBooking(movie,showtime,seatCount){
    bookingEmitter.emit("bookingStarted");

    return checkDuplicateBooking(movie,showtime,seatCount)
    .then(()=>{
        bookingEmitter.emit("bookingValidated");
        return checkSeatAvailability(showtime,seatCount);
    })
    .then(()=>generateBookingDetails(movie,showtime,seatCount))
    .then((booking)=>confirmBooking(booking,showtime))
    .catch((error)=>{
        bookingEmitter.emit("BookingFailed",error);
        throw error;
    });
}

//async/await functions
async function processBookingAsync(movie,showtime,seatCount){
    try{
        bookingEmitter.emit("bookingStarted");
        
        await checkDuplicateBooking(movie,showtime,seatCount);
        bookingEmitter.emit("bookingValidated");

        await checkSeatAvailability(showtime,seatCount);
        const booking = await generateBookingDetails(movie,showtime,seatCount);

        const confirmedBooking = await confirmBooking(booking,showtime);

        return confirmedBooking;
        
    } catch (error) {
        bookingEmitter.emit("BookingFailed", error);
        throw error;
    }
}

module.exports={
    getCurrentBooking,
    clearCurrentBooking,
    processBooking,
    processBookingAsync
}
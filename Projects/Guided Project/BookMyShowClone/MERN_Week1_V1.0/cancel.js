// To cancel the existing booking if it exists

const bookingEmitter=require("./events");
const {getCurrentBooking,clearCurrentBooking}=require("./booking");

function cancelBooking(movies){
    const booking=getCurrentBooking();
    if(!booking){
        bookingEmitter.emit("booking Failed","No booking found to cancel")
        return null;
    }

    const movie=movies.find((m)=>m.id===booking.movieId);
    if(!movie){
        bookingEmitter.emit("bookingFailed","Movie data not found while cancelling booking...");
        return null;
    }

    const showTime=movie.showTimes.find((show)=>show.time.toLowerCase()===booking.time.toLowerCase());
    if(!showTime){
        bookingEmitter.emit("bookingFailed","Show time data not found.");
        return null;
    }

    // restore seats
    showTime.seatAvailable+=booking.seatCount;

    // clear current Booking
    clearCurrentBooking();

    bookingEmitter.emit("bookingCanceled",booking);
    return booking;
}

module.exports={cancelBooking};
// Callback based validation functions

function validateMovieSelection(movies,movieId,callback){
    const selectedMovie=movies.find((movie)=>movie.id===movieId);
    if(!selectedMovie){
        return callback("Invalid movie selection. Choose a valid movie ID",null);
    }
    callback(null,selectedMovie);
}

function validateTimeSelection(movies,selectedTime,callback){
    const selectedShowTime=movie.showTimes.find((show)=>show.time.toLowerCase()===selectedTime.toLowerCase());
    if(!selectedShowTime){
        return callback("Invalid movie selection. Choose a valid Time slot",null);
    }
    callback(null,selectedShowTime);
}

function validateSeatCount(seatCount,callback){
    if(!isNaN(seatCount) || seatCount<=0){
        return callback("Invalid seat count. Enter a valid seat count",null);
    }
    callback(null,seatCount);
}

module.exports={
    validateMovieSelection,
    validateTimeSelection,
    validateSeatCount
};
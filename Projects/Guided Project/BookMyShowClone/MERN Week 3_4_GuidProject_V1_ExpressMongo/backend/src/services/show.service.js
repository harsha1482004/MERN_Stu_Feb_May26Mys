const Show=require("../models/Show");
const movie=require("../models/Movie");
const Movie = require("../models/Movie");

// Generate seats
const generateSeats=(totalSeats)=>{
    const seats=[];
    const rows=["A","B","C","E","F","G","H"];
    let seatCount=0;
    for(let row of rows){
        for(let i=0;i<=10;i++){
            if(seatCount>=totalSeats) break;
            seats.push({
                seatNumber:`${row}${i}`,
                isBooked:false,
            });
            seatCount++;
        }
    }
    return seats;
}

// Create show
exports.createShow=async({movieId,date,time,totalSeats})=>{
    // check if movie exists
    const movie=await Movie.findById(movieId);
    if(!movie)
        throw new Error("Movie not found");

    // Generate seats
    const seats=generateSeats(totalSeats);

    const show=await Show.create({
        movieId,
        date,
        time,
        totalSeats,
        availableSeats:totalSeats,
        seats,
    });
    return show;
};

// Get show
exports.getShows=async({movieId,date})=>{
    const filter={isActive:true};

    if(movieId) filter.movieId=movieId;
    if(date) filter.date=new Date(date);
    const shows=await Show.find(filter)
        .populate("movieId")
        .sort({date:1});
    return shows;
};

// Get show by ID
exports.getShowById=async(id)=>{
    const show=await Show.findById(Id).populate("movieId");
    if(!show)
        throw new Error("Show not found");
    
    return show;
};

// Update shoe
exports.updateShow=async(id,data)=>{
    const show=await Show.findByIdAndUpdate(id,data,{
        returnDocument:"after",
        runValidators:true,
    });
    if(!show)
        throw new Error("Show not found");
    
    return show;
};

exports.deleteShow=async(id,date)=>{
    const show=await Show.findByIdAndUpdate(id,{
        isActive:false
    });
    if(!show)
        throw new Error("Show not found");
};
// movies.js
// This file stores the movie data used in the CLI App

const movies = [
    {
        id:1,
        title:"Dhurandar2",
        language: "Hindi",
        genre: "Action Thriller",
        city:"Mysore",
        cinema:"Nexus Mall-screen 1",
        showtimes:[
            {time: "10:00 AM",seatsAvailable: 200},
            {time: "1:00 PM",seatsAvailable: 170},
            {time: "6:00 PM",seatsAvailable: 230}
        ]
    },
    {
        id:2,
        title:"LoveMocktail3",
        language: "kannada",
        genre: "Emotional Romantic",
        city:"Mysore",
        cinema:"DRC Mall-screen 2",
        showtimes:[
            {time: "10:00 AM",seatsAvailable: 100},
            {time: "1:00 PM",seatsAvailable: 70},
            {time: "6:00 PM",seatsAvailable: 130}
        ]
    },
    {
        id:3,
        title:"Hayagriva",
        language: "kannada",
        genre: "Action",
        city:"Banglore",
        cinema:"PVR Mall-screen 1",
        showtimes:[
            {time: "11:00 AM",seatsAvailable: 200},
            {time: "2:00 PM",seatsAvailable: 270},
            {time: "7:00 PM",seatsAvailable: 300}
        ]
    }
];
//Export the movie data so that other files can use it. 
module.exports = movies;
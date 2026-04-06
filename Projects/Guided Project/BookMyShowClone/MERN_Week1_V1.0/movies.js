// This file stores the movie data used in the CLI App

const movies=[{
    id:1,
    title:"Dhurender 2",
    showTimes:[
        {time:"10 AM",seatsAvailable:100},
        {time:"1 AM",seatsAvailable:100},
        {time:"6 AM",seatsAvailable:100}
    ]
},
{
    id:2,
    title:"Love-mockTail 3",
    showTimes:[
        {time:"10 AM",seatsAvailable:100},
        {time:"1 AM",seatsAvailable:100},
        {time:"6 AM",seatsAvailable:100}
    ],
},
{
    id:3,
    title:"Hayagriva",
    showTimes:[
        {time:"11 AM",seatsAvailable:100},
        {time:"2 AM",seatsAvailable:100},
        {time:"7 AM",seatsAvailable:100}
    ],
}
];

// Exports the movie data so that, other can use it
module.export=movies;
let tickets=[
     {id: "T101",priority:"LOW", resolved:true},
     {id: "T102",priority:"HIGH", resolved:true},
     {id: "T103",priority:"LOW", resolved:false},
     {id: "T104",priority:"MEDIUM", resolved:true},
     {id: "T105",priority:"HIGH", resolved:false}
];
tickets.unshift({id: "T100",priority:"HIGH", resolved:true});
tickets.push({id: "T106",priority:"MEDIUM", resolved:true},
    {id: "T107",priority:"MEDIUM", resolved:false}
);
console.log(tickets);

tickets.shift();

let currentTicket=[{id:"T100",priority:"HIGH", resolved:true}];
console.log("Current ticket :", currentTicket);

tickets.pop();

let droppedTicket=[{id:"T107",priority:"MEDIUM",resolved:false}];
console.log("Duplicate ticket:",droppedTicket);

let pending=tickets.filter(tickets=>tickets.resolved!=true);
console.log("Pending Tickets:",pending);

let pendingIds=tickets.map(tickets=>tickets.id);
console.log("Ticket IDs:",pendingIds);


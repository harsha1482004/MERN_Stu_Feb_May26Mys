// Reduce function
let nums=[5,7,15];
let total=nums.reduce((intermediateSum,current)=>intermediateSum+current,10);
let avg=total/nums.length;
console.log(total);
console.log(avg);

// Reduce to adjust count by category
let items=['pen','pencil','pen','eraser'];
let count=items.reduce((startvalue,cmpvalue)=>{
    startvalue[cmpvalue]=(startvalue[cmpvalue] || 0)+ 1;
    return startvalue;
},{});
console.log("Item count: ",count);
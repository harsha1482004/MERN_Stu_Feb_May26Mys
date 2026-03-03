// Default parameters
function product(a,b=1){
    return a*b;
}
console.log("The product of 15 and 4:",product(15,4));
console.log("The product of 15:",product(15));

// Rest parameters
function SumOfAll(...numbers){
    console.log(...numbers);
}
SumOfAll(1,2,3);
SumOfAll(10);
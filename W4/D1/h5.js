// Breakpoint
// Insecpt the variables values
// view the call stack
// step through code line by line
// Evaluate expressions in the console
// watch how variables change during the execution
// To find logical errors
// Browser(debugger)

function calculateTotal(prices){
    let total=0;
    for(let i=0;i<prices.length;i++) {
        let price=prices[i];
        debugger;
        total+=price;
    }
    return total;
}

let cart=[100,300,699,122,540,1000];
calculateTotal(cart);
console.log("Total:",calculateTotal(cart));
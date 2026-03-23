// CommonJS export and import

function calculateTax(amount){
    return amount*0.18;
}
function applyDiscount(amount,percent){
    return amount-amount*(percent/100);
}
function formatCurrency(amount){
    return "INR "+amount.toFixed(2);
}
//module.exports makes function available to requie()
module.exports={calculateTax,applyDiscount,formatCurrency};
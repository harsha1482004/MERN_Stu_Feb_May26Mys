// Custom CommonJS modules
const {calculateTax,applyDiscount,formatCurrency}=require("./p2")

const itemName="Laptop";
const basePrice=60000;

const discountedPrice=applyDiscount(basePrice,10);
const taxAmount=calculateTax(discountedPrice);
const finalPrice=discountedPrice+taxAmount;

console.log("Item",itemName);
console.log("Base Price:",formatCurrency(basePrice));
console.log("Discounted price:",formatCurrency(discountedPrice));
console.log("GST tax:",formatCurrency(taxAmount))
console.log("Final Price:",formatCurrency(finalPrice));
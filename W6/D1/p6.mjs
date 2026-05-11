// Import ES modules 

import createInvoiceLabel,{calculateTotal,taxRate} from "./p5.mjs";

const subtotal=4000;
const total=calculateTotal(subtotal);
const label=createInvoiceLabel("INV-2026-001");

console.log("Invoice label:",label);
console.log("Tax Rate:",taxRate);
console.log("Final total:",total);
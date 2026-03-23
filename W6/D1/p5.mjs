// ES module exports

// named export for a shared constant
export const taxRate=0.18;

// Named export for a reusable function
export function calculateTotal(subtotal){
    return subtotal+subtotal*taxRate;
}

// Default export for the main feature of the module.
export default function createInvoiceLabel(invoiceNumber){
    return "Invoice:"+invoiceNumber;
}

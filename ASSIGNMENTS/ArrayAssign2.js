const payrollrecords = [
  { name: "Harsha", basePay: 30000, bonus: 2000, taxRate: 0.1 },
  { name: "Ajay", basePay: -500, bonus: 100, taxRate: 0.2 }
];

const validRecords = payrollrecords.filter(employee => 
  employee.basePay > 0 && 
  employee.bonus >= 0 && 
  employee.taxRate >= 0 && employee.taxRate <= 1
);

const netPayReport = validRecords.map(employee => {
  const gross = employee.basePay + employee.bonus;
  const netPay = gross - (gross * employee.taxRate);
  return { name: employee.name, netPay: netPay };
});
const totalNetPayout = netPayReport.reduce((acc, curr) => acc + curr.netPay, 0);

console.log("Valid Records:", validRecords);
console.log("Net Pay Report:", netPayReport);
console.log("Total Net Payout:", totalNetPayout);
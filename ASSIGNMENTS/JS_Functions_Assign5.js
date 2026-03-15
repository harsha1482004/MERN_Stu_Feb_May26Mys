const wallet = {
    owner: "Harsha",
    balance: 0.00,
    lastTransaction: null,          
    deposit(amount) {               
        if (amount > 0) {
            this.balance += amount; 
            this.updateLastTransaction("DEPOSIT", amount); 
            console.log(`Deposited ${amount}. New balance: ${this.balance}`);
        } else {
            console.log("Rejected: amount must be greater than 0");
        }
    },

    withdraw(amount) {              
        if (amount <= this.balance){ 
            this.updateLastTransaction("WITHDRAW", amount); 
            console.log(`Amount withdrawn. New balance: ${this.balance}`);
        } else {
            console.log("Withdraw amount exceeds balance");
        }
    },
    updateLastTransaction(type, amount){  
        this.lastTransaction = {
            type: type,
            amount: amount,
            balanceAfter: this.balance
        };
    }
};
wallet.deposit(500);
wallet.withdraw(2000);
console.log(wallet.lastTransaction);
#! /usr/bin/env node

import inquirer from "inquirer";

//Bank Account Interface
interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  chekbalance(): void;
}
//Bank Account Class
class BankAccount implements BankAccount {
  accountNumber: number;
  balance: number;

  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  //Debit Money
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        `Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`
      );
    } else {
      console.log("Insufficient balance.");
    }
  }
  //Credit Money
  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1; // $1 fee deposited
    }
    this.balance += amount;
    console.log(
      `Deposit of $${amount} successful. Remaining balance: $${this.balance}`
    );
  }
  //Check Balance
  checkbalance(): void {
    console.log(`Current balance: $${this.balance}`);
  }
}
//Customer Class
class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: number,
    account: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}

//Creat Bank Accounts

const accounts: BankAccount[] = [
  new BankAccount(2020, 500),
  new BankAccount(2024, 1000),
];

//Create Customers

const customers: Customer[] = [
  new Customer("Usman", "Ali", "Male", 30, 3032244504, accounts[0]),
  new Customer("Zeeshan", "Ali", "Male", 20, 31622244504, accounts[1]),
];
//Function to interact with bank
async function service() {
  do {
    const accountNumberInput = await inquirer.prompt({
      name: "accountNumber",
      type: "number",
      message: "Enter your account number:",
    });
    const customer = customers.find(
      (customer) =>
        customer.account.accountNumber === accountNumberInput.accountNumber
    );
    if (customer) {
      console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
      const ans = await inquirer.prompt([
        {
          name: "select",
          type: "list",
          message: "Select an operation",
          choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
        },
      ]);

      switch (ans.select) {
        case "Deposit":
          const depositAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount to deposit:",
          });
          customer.account.deposit(depositAmount.amount);
          break;
        case "Withdraw":
          const withdrawAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount to withdraw:",
          });
          customer.account.withdraw(withdrawAmount.amount);
          break;
        case "Check Balance":
          customer.account.checkbalance();
          break;
        case "Exit":
          console.log("Exiting bank program...");
          console.log(
            "/n Thank you for using our bank services. Have a great day!"
          );
          return;
      }
    } else {
      console.log("Invalid account number. Please try again.");
    }
  } while (true);
}

service();

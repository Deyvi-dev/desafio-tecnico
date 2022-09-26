// import * as readline from 'node:readline';
const moment = require("moment");
const readline = require('readline')
// import { creatAccount} from "./creatAccount.js";
// import {transactions} from "./transactions.js"
var transactionHistory = []
var resultAccount = null
var res = ''
var leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function loop() {
  leitor.question("use os metodos:\n\ncreat\ntransaction\nexit\n", function (answer) {
    if (answer === 'creat') {
      leitor.question('', function (json) {
        res = json
       creatAccount(JSON.parse(res))
       loop()
      })
    } else if (answer === 'transaction') {
      leitor.question('', function (tr) {
        transactions(JSON.parse(tr))
        loop()
      })
    } else if (answer === 'exit') {
      leitor.close()
    } else {
      return loop()
    }
  })
  function creatAccount(account) {
    if(resultAccount === null && account.account['active-card'] === true ) {
      resultAccount = account
      resultAccount.violations = []
      console.log(JSON.stringify(resultAccount))
    } else if(account.account['active-card'] === true){
      account = { ...resultAccount, violations: ["account-already-initialized"] }
      console.log(JSON.stringify(account))
    }else{
      console.log("digite um json valido")
    }
    
  } 
  
  function transactions(transac) {
    let value = ''
    console.log(typeof(transac))
    console.log(resultAccount)
    value = resultAccount.account['available-limit'] - transac.transaction.amount
    console.log(value)
    let consult = transac
    const validationTransac = transactionHistory.find((valueObj) => {
        if (valueObj.transaction.merchant === consult.transaction.merchant) {
            time1 = moment(valueObj.transaction.time)
            time2 = moment(consult.transaction.time)
            return time2.diff(time1) <= 120000
        }
    })
    if (value <0 && validationTransac) {
        console.log(time2.diff(time1))
        let notresultAccount = resultAccount
        notresultAccount = { ...notresultAccount, violations: ["insufficient-limit", "doubled-transaction"] }
        console.log(JSON.stringify(notresultAccount))
        console.log('achei')
        loop()
    }
  
    else if (value < 0) {

        let notresultAccount2 = resultAccount
        notresultAccount2 = { ...notresultAccount2, violations: ["insufficient-limit"] }
        console.log(JSON.stringify(notresultAccount2))
  
        loop()
    } else if (validationTransac) {
        notresultAccount3 = resultAccount
        notresultAccount3 = { ...notresultAccount3, violations: ["doubled-transaction"] }
        console.log(time2.diff(time1))
        console.log(JSON.stringify(notresultAccount3))
        loop()
    }
    else {
        resultAccount.account["available-limit"] = value
        transactionHistory = transac
        transactionHistory = [{ ...transac }]
        transactionHistory.push(transac)
        console.log(JSON.stringify(resultAccount))
        loop()
    }
  }
}

loop()

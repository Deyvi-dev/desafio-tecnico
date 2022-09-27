import * as readline from 'node:readline';
import { transactions } from './transactions.js';
import { creatAccount } from './creatAccount.js';
var leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
//funçaõ responsevel por pegar os inputs
function loop() {
  leitor.question("use os metodos:\n\ncreat\ntransaction\nexit\n", function (answer) {
    if (answer === 'creat') {
      leitor.question('', function (json) {
        json
       creatAccount(JSON.parse(json))
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
}

loop()

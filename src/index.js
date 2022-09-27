import * as readline from "node:readline";
import * as transaction from "./modules/transaction/index.js";
import * as account from "./modules/account/index.js";
import * as constants from "./constants.js";

var readerCLI = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var history = [];

function main() {
  console.log("history", history);
  readerCLI.question(constants.QUESTION_USER, answerUser);
}

function answerUser(answer) {
  const ANSWER_LOWER = answer.toLowerCase();

  switch (ANSWER_LOWER) {
    case constants.CREATE_NAME:
      readerCLI.question("input: ", function (jsonReceived) {
        let result = account.createAccount(jsonReceived);
        history.push(result);
        main();
      });
    case constants.TRANSACTION_NAME:
      readerCLI.question("input: ", function (jsonReceived) {
        let result = transaction.execute(jsonReceived);
        history.push(result);
        main();
      });
      break;
    case constants.EXIT_NAME:
      exitHandler();
      break;
    case constants.HISTORY_NAME:
    default:
      console.log(history);
      main();
      break;
  }
}

function exitHandler() {
  console.log(history);
  console.log("obrigado");
  readerCLI.close();
}

main();

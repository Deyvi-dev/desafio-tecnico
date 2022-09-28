import moment from "moment";
import * as account from "../account/index.js";
import * as constants from "../../constants.js";
import { transactionHistory } from "./index.js";

function isDoubledTransaction(transactionCurrentJson) {

  var transactionOld = transactionHistory.find((transactionOldJson) => {
    if (
      transactionOldJson.transaction.merchant ===
      transactionCurrentJson.transaction.merchant &&
      transactionOldJson.transaction.amount ===
      transactionCurrentJson.transaction.amount
    ) {
      let transactionCurrentTime = moment(transactionCurrentJson.transaction.time);
      let transactionOldTime = moment(transactionOldJson.transaction.time);

      // return true
      if (transactionCurrentTime.diff(transactionOldTime) <= constants.TIME_FOR_DOUBLED_TRANSACTION) {
        return true
      }
    }

  })
  return transactionOld
}





function hasCreditCardLimit(transactionCurrent) {
  let limitCurrent =
    account.accountData.account.account["available-limit"] -
    transactionCurrent.transaction.amount;
  console.log("log1", transactionCurrent.transaction.amount)
  return limitCurrent > 0;
}

function newCreditCardLimit(transactionCurrent) {
  let limitCurrent =
    account.accountData.account.account["available-limit"] -
    transactionCurrent.transaction.amount;
  console.log("log2", account.accountData.account)
  return limitCurrent;
}

function isValidTransactionContract(transactionJson) {
  if (
    !transactionJson.transaction ||
    !transactionJson.transaction.merchant ||
    !transactionJson.transaction.amount ||
    !transactionJson.transaction.time
  ) {
    return false;
  }

  return true;
}

export {
  isDoubledTransaction,
  hasCreditCardLimit,
  newCreditCardLimit,
  isValidTransactionContract,
};

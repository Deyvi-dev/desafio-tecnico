import moment from "moment";
import * as account from "../account/index.js";
import * as constants from "../../constants.js";

function isDoubledTransaction(transactionCurrentJson) {
  transactionOld = transactionHistory.find((transactionOldJson) => {
    if (
      transactionOldJson.transaction.merchant ===
        transactionCurrentJson.transaction.merchant &&
      transactionOldJson.transaction.amount ===
        transactionCurrentJson.transaction.amount
    ) {
      return transactionOldJson;
    }
  });

  let transactionCurrentTime = moment(transactionCurrentJson.transaction.time);
  let transactionOldTime = moment(transactionOld.transaction.time);
  return (
    transactionCurrentTime.diff(transactionOldTime) <=
    constants.TIME_FOR_DOUBLED_TRANSACTION
  );
}

function hasCreditCardLimit(transactionCurrent) {
  let limitCurrent =
    account.accountData.account["available-limit"] -
    transactionCurrent.transaction.amount;
  return limitCurrent > 0;
}

function newCreditCardLimit(transactionCurrent) {
  let limitCurrent =
    account.accountData.account["available-limit"] -
    transactionCurrent.transaction.amount;
  return limitCurrent;
}

function isValidTransactionContract() {
  if (
    !accountJson.transaction ||
    !accountJson.transaction.merchant ||
    !accountJson.transaction.amount ||
    !accountJson.transaction.time
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

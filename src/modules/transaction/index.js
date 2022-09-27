import * as utils from "./utils.js";
import * as constants from "../../constants.js";

var transactionHistory = [];

function execute(transactionJson) {
  let transactionData = transactionJson;

  if (utils.isValidTransactionContract(transactionJson)) {
    if (!hasCreditCardLimit(transactionJson)) {
      transactionData.violations.push(constants.ERROR_NOT_LIMIT);
    } else {
      if (isDoubledTransaction(transactionJson)) {
        transactionData.violations.push(constants.ERROR_DOUBLED_TRANSACTION);
      } else {
        transactionData.account["available-limit"] =
          newCreditCardLimit(transactionJson);
      }
    }

    transactionHistory.push(transactionData);
    return transactionData;
  } else {
    return constants.ERROR_INVALID_TRANSACTION_CONTRACT;
  }
}

export { execute, transactionHistory };

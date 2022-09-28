import * as utils from "./utils.js";
import * as constants from "../../constants.js";
import * as account from "../account/index.js"
var transactionHistory = [];

function execute(transactionJson) {
  let transactionData = transactionJson;
  var  transactionERRO = {...account.accountData.account}
  if (utils.isValidTransactionContract(transactionJson)) {
    console.log("ixxx")
    if (!utils.hasCreditCardLimit(transactionJson)) {
      console.log("ue", transactionERRO.violations)
      transactionERRO.violations.push(constants.ERROR_NOT_LIMIT);
    } else {
      if (utils.isDoubledTransaction(transactionJson)) {
        console.log('foi trueeeee::')
        transactionERRO.violations.push(constants.ERROR_DOUBLED_TRANSACTION);
      } else {
        console.log("ue2",account.accountData.account.account["available-limit"])
        account.accountData.account.account["available-limit"] =
          utils.newCreditCardLimit(transactionJson);
      }
    }

    transactionHistory.push(transactionData);
    return transactionData;
  } else {
    return constants.ERROR_INVALID_TRANSACTION_CONTRACT;
  }
}

export { execute, transactionHistory };

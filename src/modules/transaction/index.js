import * as utils from "./utils.js";
import * as constants from "../../constants.js";
import * as account from "../account/index.js"
var transactionHistory = [];

function execute(transactionJson) {
  let transactionData = transactionJson;
  var  transactionERRO = {...account.accountData.account}
  if (utils.isValidTransactionContract(transactionJson)) {
    if (!utils.hasCreditCardLimit(transactionJson)) {
      transactionERRO.violations =[...transactionERRO.violations]
      transactionERRO.violations.push(constants.ERROR_NOT_LIMIT);
    } else {
      if (utils.isDoubledTransaction(transactionJson)) {
        transactionERRO.violations = [...transactionERRO.violations]
        transactionERRO.violations.push(constants.ERROR_DOUBLED_TRANSACTION);
      } else {
        account.accountData.account.account["available-limit"] =
          utils.newCreditCardLimit(transactionJson);
      }
    }

    transactionHistory.push({...transactionData});
    return {...transactionData};
  } else {
    return constants.ERROR_INVALID_TRANSACTION_CONTRACT;
  }
}

export { execute, transactionHistory };

import * as utils from "./utils.js";
import * as constants from "../../constants.js";

var accountData = { status: false, account: null };

function createAccount(accountJson) {
  if (accountData.status) {
    accountData.account.violations.push(
      constants.ERROR_ACCOUNT_ALREADY_INITIALIZED
    );
    return accountData.account;
  }

  if (utils.isValidCreateContract(accountJson)) {
    if (!accountData.account["active-card"]) {
      accountData.account.violations.push(constants.ERROR_CARD_NOT_ACTIVE);
      return accountData.account;
    }

    accountData.status = true;
    accountJson.violations = [];
    accountData.account = accountJson;
    return accountData.account;
  } else {
    return constants.ERROR_INVALID_ACCOUNT_CONTRACT;
  }
}

export { createAccount, accountData };

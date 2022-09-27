function isValidCreateContract(accountJson) {
  if (
    !accountJson.account ||
    !accountJson.account["active-card"] ||
    !accountJson.account["available-limit"]
  ) {
    return false;
  }

  return true;
}

export { isValidCreateContract };

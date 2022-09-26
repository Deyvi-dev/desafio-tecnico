var resultAccount = null
export  function creatAccount(account) {
  if (resultAccount === undefined && account.account['active-card'] === true ) {
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

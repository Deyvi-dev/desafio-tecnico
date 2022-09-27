var resultAccount = null

//Função respomsavel por criar a conta
 function creatAccount(account) {
  // caso nao exita e o valor do active-card true? ele cria uma conta e armazena na variavel resultAccount
   if (resultAccount === null && account.account['active-card'] === true ) {
    resultAccount = account
    resultAccount.violations = []
    console.log(JSON.stringify(resultAccount))
    return resultAccount
    //caso exita o valor do active-card true?  cria um objeto copia e adiciona as violações da lógica de negócios.
   } else if(account.account['active-card'] === true){
     account = { ...resultAccount, violations: ["account-already-initialized"] }
     console.log(JSON.stringify(account))     
     return account
   }else{
     console.log("digite um json valido")
   }

 }

export {creatAccount, resultAccount}





//  import resultAccount, { creatAccount} from "./creatAccount.js";
import moment from 'moment'
import { resultAccount } from './creatAccount.js'
var transactionHistory = []
//função responsavel pelas transações
function transactions(transac) {
    
    let value = ''
    // variavel value recebe a subritação da conta e transação
    value = resultAccount.account['available-limit'] - transac.transaction.amount
    let consult = transac
    // funçao responsavel por determinar se tem uma transação feita em 2minutos pra baixo
    const validationTransac = transactionHistory.find((valueObj) => {
        if (valueObj.transaction.merchant === consult.transaction.merchant) {
            let time1 = moment(valueObj.transaction.time)
            let time2 = moment(consult.transaction.time)
            return time2.diff(time1) <= 120000
        }
    })
    // casso o valor da transação for maior que o limite da conta e ter uma transação feita em 2 minutos ? cria um objeto copia e adiciona as violações da lógica de negócios.
    if (value < 0 && validationTransac) {
        let notresultAccount = resultAccount
        notresultAccount = { ...notresultAccount, violations: ["insufficient-limit", "doubled-transaction"] }
        console.log(JSON.stringify(notresultAccount))

    }

    else if (value < 0) {
        // se o valor da transação for maior que o limite da conta cria um objeto copia e adiciona as violações da lógica de negócios.
        let notresultAccount2 = resultAccount
        notresultAccount2 = { ...notresultAccount2, violations: ["insufficient-limit"] }
        console.log(JSON.stringify(notresultAccount2))


    } else if (validationTransac) {
        //ter uma transação feita em 2 minutos ? cria um objeto copia e adiciona as violações da lógica de negócios.
        let notresultAccount3 = resultAccount
        notresultAccount3 = { ...notresultAccount3, violations: ["doubled-transaction"] }
        console.log(JSON.stringify(notresultAccount3))

    }
    else {
// caso nao viole nenhuma regra de negocio ? permite a transação, e a vonta passa ter um novo valor limite
        resultAccount.account["available-limit"] = value
        transactionHistory = transac
        //obs: transactionHistory é o array que armazena o historico das transaçao sem ele nnao teria como validar as logicas de negocio
        transactionHistory = [{ ...transac }]
        transactionHistory.push(transac)
        console.log(JSON.stringify(resultAccount))

    }
}
export { transactions}

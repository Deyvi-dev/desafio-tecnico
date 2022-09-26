//  import resultAccount, { creatAccount} from "./creatAccount.js";
 
 export function transactions(transac) {
    let value = ''
    console.log(typeof(transac))
    console.log(resultAccount)
    value = resultAccount.account['available-limit'] - transac.transaction.amount
    console.log(value)
    let consult = transac
    const validationTransac = transactionHistory.find((valueObj) => {
        if (valueObj.transaction.merchant === consult.transaction.merchant) {
            console.log('hehe')
            time1 = moment(valueObj.transaction.time)
            time2 = moment(consult.transaction.time)
            console.log(time2.diff(time1) <= 120000)
            return time2.diff(time1) <= 120000
        }
    })
    if (value <0 && validationTransac) {
        
        console.log(time2.diff(time1))
        let notresultAccount = resultAccount
        notresultAccount = { ...notresultAccount, violations: ["insufficient-limit", "doubled-transaction"] }
        console.log(JSON.stringify(notresultAccount))
        console.log('achei')
       
    }

    else if (value < 0) {
      
        let notresultAccount2 = resultAccount
        notresultAccount2 = { ...notresultAccount2, violations: ["insufficient-limit"] }
        console.log(JSON.stringify(notresultAccount2))

       
    } else if (validationTransac) {
        notresultAccount3 = resultAccount
        notresultAccount3 = { ...notresultAccount3, violations: ["doubled-transaction"] }
        console.log(time2.diff(time1))
        console.log(JSON.stringify(notresultAccount3))
        console.log('achei')
        
    }
    else {
        
        resultAccount.account["available-limit"] = value
        transactionHistory = transac
        transactionHistory = [{ ...transac }]
        transactionHistory.push(transac)
        console.log(resultAccount)
        // console.log(validationTransac)
        // console.log(history)
        
    }
}

transactions({ "transaction": { "merchant": "Burger King", "amount": 10, "time": "2019-02-13T10:00:00.000Z" } })
transactions({ "transaction": { "merchant": "Burger King", "amount": 10, "time": "2019-02-13T10:00:00.000Z" } })
transactions({ "transaction": { "merchant": "Burger King", "amount": 20, "time": "2019-02-13T10:00:00.000Z" } })
transactions({ "transaction": { "merchant": "Burger King", "amount": 20, "time": "2019-02-13T10:00:00.000Z" } })
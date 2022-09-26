const readline = require('readline');
const f = require('fs');
var file = './operations.jsonl'
result = null
history = []
result = null
var rl = readline.createInterface({
    input: f.createReadStream(file),
    output: process.stdout,
    terminal: false
});
rl.on('line', function (text) {
    if (text.includes('account')) {
        validar(JSON.parse(text))
    } else if (text.includes('transaction')) {
        transaction(JSON.parse(text))
    }
})
function validar(account) {
    convertAccount = JSON.stringify(account)
    convertAccount = convertAccount.replace(/-/g, "CONVERT")
    convertAccount = JSON.parse(convertAccount)
    if (result === null && (convertAccount.account.activeCONVERTcard === true)) {
        // console.log(convertAccount)
        result = account
        result.violations = []
        console.log(JSON.stringify(result))

    } else if (convertAccount.account.activeCONVERTcard === true) {
        let account2 = result
        account2 = { ...account2, violations: ["account-already-initialized"] }
        console.log(JSON.stringify(account2))

    } else {
        console.log("digite um json valido")

    }
}
function transaction(transac) {
    converTransac = transac
    texte = JSON.stringify(result)
    convert = texte.replace(/-/g, "CONVERT")
    convert2 = JSON.parse(convert)
    value = convert2.account.availableCONVERTlimit - converTransac.transaction.amount
    consult = transac
    validationTransac1 = history.find((valueObj) => {
        if (value < 0 && valueObj.transaction.merchant === consult.transaction.merchant) {
            time1 = moment(valueObj.transaction.time)
            time2 = moment(consult.transaction.time)
            return time2.diff(time1) <= 120000
        }
    })
    if (validationTransac1) {
        console.log(time2.diff(time1))
        notResult = result
        notResult = { ...notResult, violations: ["insufficient-limit", "doubled-transaction"] }
        console.log(JSON.stringify(notResult))
        console.log('achei')
        loop()
    }

    else if (value < 0) {
        // console.log(typeof(result))
        notResult2 = result
        notResult2 = { ...notResult2, violations: ["insufficient-limit"] }
        console.log(JSON.stringify(notResult2))


    }
    else if (true) {
        validationTransac = history.find((valueObj) => {
            time1 = moment(valueObj.transaction.time)
            time2 = moment(consult.transaction.time)
            if (valueObj.transaction.merchant === consult.transaction.merchant && time2.diff(time1) <= 120000) {
                return true
            }
        }
        )
        if (validationTransac) {
            notResult3 = result
            notResult3 = { ...notResult3, violations: ["doubled-transaction"] }
            console.log(time2.diff(time1))
            console.log(JSON.stringify(notResult3))
            console.log('achei')
            //    loop()
        }
        else {
            console.log('nao achei')
            convert2.account.availableCONVERTlimit = value
            convert3 = JSON.stringify(convert2)
            convert4 = convert3.replace(/CONVERT/g, "-")
            result = JSON.parse(convert4)
            consult = transac
            console.log(convert4)
            historyTransac = { ...history, }
            history.push(transac)

        }
    }
}

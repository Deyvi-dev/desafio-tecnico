import {creatAccount} from '../creatAccount.js'

test('criaa conta sem viola ogica da regra de negocio', () => {
  expect(creatAccount(conta)).toStrictEqual(result)
});
test('nao cria conta e viola a logica de negocio',()=>{
  expect(creatAccount(conta)).toStrictEqual(result2)
})

var conta = {"account": {"active-card": true, "available-limit": 100}}
var result = {"account": {"active-card": true, "available-limit": 100}, "violations": []}
var result2 = {"account":{"active-card":true,"available-limit":100},"violations":["account-already-initialized"]}

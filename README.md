### Instalação
```
# Abra o terminal e copie este repositório com o comando
$ git clone https://github.com/Deyvi-dev/desafio-tecnico.git

# Acesse a pasta do projeto no prompt de comando 
$ cd desafio-tecnico/src

# Instale as dependências
yarn install
ou
$ npm install

# Execute a aplicação
$ node index.js
$ use os metodos create transaction history e exit
# para criação e transaçoes use essas linhas Json base

{"account": {"active-card": true, "available-limit": 100}}
{"account": {"active-card": true, "available-limit": 100}}
{"transaction": {"merchant": "Burger King", "amount": 20, "time":"2019-02-13T10:00:00.000Z"}}
{"transaction": {"merchant": "Habbib's", "amount": 90, "time":"2019-02-13T11:00:00.000Z"}}
{"transaction": {"merchant": "Habbib's", "amount": 90, "time":"2019-02-13T10:01:00.000Z"}}
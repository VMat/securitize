# Digital Wallet Dashboard

## Stack

  - NestJs  
  - React. 
  - Mongodb. 
  - GraphQL. 

## Steps

### API
1) git clone https://github.com/VMat/securitize-api.git
2) docker build . -t villalvama/securitize-api
3) docker-compose up [dev|prod|mongo]

### UI
1) git clone https://github.com/VMat/securitize.git
2) docker build . -t villalvama/securitize-ui
3) docker-compose up [dev|prod]

### Prerequesites
1) Insert the following exchange rates through the graphQL Playground ${API_HOST}:${API_PORT}/graphql e.g "http://localhost:3000/graphql"

mutation createUsdExchange {
    createExchange (payload: { name: "USD", rate: 2.5 }) {
        name
        rate
    }
}
mutation createEurExchange {
    createExchange (payload: { name: "EUR", rate: 1.8 }) {
        name
       rate
    }
}
mutation createEthExchange {
    createExchange (payload: { name: "ETH", rate: 1 }) {
        name
        rate
    }
}

## Live demo
### https://securitize.herokuapp.com/


Author: Matías Villalva

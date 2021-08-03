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
3) docker run -p 8080:80 villalvama/securitize-ui [dev|prod]

## Live demo
### https://securitize.herokuapp.com/


Author: Matías Villalva

import gql from 'graphql-tag';


export const UPDATE_EXCHANGE = gql`
mutation updateExchange ($payload: UpdateExchangeInput!){
  updateExchange (payload: $payload) {
      _id
      name
      rate
  }
}`;

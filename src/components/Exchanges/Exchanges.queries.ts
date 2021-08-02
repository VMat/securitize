import gql from 'graphql-tag';


export const GET_EXCHANGES = gql`
  query exchanges ($filters: ListExchangeInput){
    exchanges (filters: $filters) {
        _id
        name
        rate
    }
  }

  
`;

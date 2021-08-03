import gql from 'graphql-tag';


export const GET_WALLETS = gql`
  query wallets ($filters: ListWalletInput){
    wallets (filters: $filters) {
        _id
        address
        balance
        isOld
        isFavorite
    }
  }
`;

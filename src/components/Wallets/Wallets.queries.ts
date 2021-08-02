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

export const UPDATE_WALLET = gql`
mutation updateWallet ($payload: UpdateWalletInput!){
  updateWallet (payload: $payload) {
      _id
      address
      balance
      isOld
      isFavorite
  }
}
`; 

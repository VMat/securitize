import gql from 'graphql-tag';


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

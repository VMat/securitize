import gql from 'graphql-tag';

export const CREATE_WALLET = gql`
  mutation createWallet ($payload: CreateWalletInput!){
    createWallet (payload: $payload) {
        _id
        address
        balance
        isOld
        isFavorite
    }
  }
`;

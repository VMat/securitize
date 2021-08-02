import createSagaMiddleware from 'redux-saga';
import { put, takeEvery, all } from 'redux-saga/effects';
import { applyMiddleware, createStore } from 'redux';
import { first } from 'lodash';
import { EXCHANGE_TYPES } from './constants';

export const PROPERTIES = {
    ASYNC_MESSAGE: 'asyncMessage',
    NEW_WALLET: 'newWallet',
    REFETCH_WALLETS: 'refetchWallets',
    CHANGE_FAVORITE: 'changeFavorite',
    WALLETS: 'wallets',
    EXCHANGES: 'exchanges',
    ACTIVE_EXCHANGE: 'activeExchange',
};

const reducer = (state : any, action: { type: string, payload: any }) => {
    switch (action.type) {
        case PROPERTIES.WALLETS: {
            return { ...state, wallets: action.payload.map((e: any) => ({...e})) }
        }
        case PROPERTIES.NEW_WALLET: {
            return { ...state, wallets: [...state.wallets, action.payload]}
        }
        case PROPERTIES.CHANGE_FAVORITE: {
            const { _id, isFavorite } = action.payload;
            (first(state.wallets.filter((e: any) => e._id === _id ) ) as any).isFavorite = isFavorite;
            return { ...state }
        }
        default: return { ...state, [action.type]: action.payload };
    }
};

const newWalletDispatch = function* watchNewWalletDispatch(props: { type: string, payload: any }) {
    yield put({ type: PROPERTIES.REFETCH_WALLETS, payload: true });
};

const changeSaga = function* watchChangeFilterAsync() {
    yield takeEvery(PROPERTIES.NEW_WALLET, newWalletDispatch);
};

const sagaMiddleware = createSagaMiddleware();

const storeVar = createStore(
    reducer,
    {
        activeExchange: EXCHANGE_TYPES.DOLLAR,
    },
    applyMiddleware(sagaMiddleware),
);

const rootSaga = function* rootSaga() {
    yield all([
        changeSaga(),
    ])
};

sagaMiddleware.run(rootSaga);

export const dispatch = (type: string, payload: any = null) => store.dispatch({ type, payload });

export const store = storeVar;

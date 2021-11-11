import { combineReducers } from 'redux'
import { changeExchangeRates, exchangeWallet } from './actions'

const initialWallet = [
    {currency: 'USD', symbol: '$', amount: 200, rate: 1},
    {currency: 'EUR', symbol: '€', amount: 150, rate: 1},
    {currency: 'GBP', symbol: '£', amount: 10, rate: 1},
]

const initialSaga = {
    loading: false,
    error: false,
    message: ''
}

export const walletReducer = (state=initialWallet, action) => {
    switch (action.type) {
        case 'NEW_EXCHANGE_RATES':
            return changeExchangeRates(state, action.data)
        case 'EXCHANGE_WALLET_CURRENCIES':
            return exchangeWallet(state, action.data)
        default:
            return state
    }
}

export const sagaReducer = (state=initialSaga, action) => {
    switch (action.type) {
        case 'REQUEST_EXCHANGE_RATES':
            return {
                ...state,
                loading: true,
                error: false,
                message: ''
            }
        case 'REQUEST_SUCCESS':
            return {
                ...state,
                loading: false,
                error: false,
                message: ''
            }
        case 'REQUEST_FAILED':
            return {
                ...state,
                loading: false,
                error: true,
                message: action.message
            }
        default:
            return state
    }
}

export default combineReducers({
    wallet: walletReducer,
    saga: sagaReducer
})
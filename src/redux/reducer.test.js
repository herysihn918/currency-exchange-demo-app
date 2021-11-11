import {walletReducer} from './reducer'

test('wallet initial state test', () => {
    expect(walletReducer(undefined, {})).toEqual([
        {currency: 'USD', symbol: '$', amount: 1000, rate: 1},
        {currency: 'EUR', symbol: '€', amount: 1000, rate: 1},
        {currency: 'GBP', symbol: '£', amount: 1000, rate: 1},
    ])
})

test('wallet new rate test', () => {
    const previousState = [{currency: 'USD', symbol: '$', amount: 1000, rate: 1}]
    const data = {'USD': 0.8}
    expect(walletReducer(previousState, {type: 'NEW_EXCHANGE_RATES', data: data})).toEqual([
        {currency: 'USD', symbol: '$', amount: 1000, rate: 0.8}
    ])
})

test('wallet exchange test', () => {
    let previousState = [
        {currency: 'USD', amount: 10}, 
        {currency: 'EUR', amount: 10}
    ]
    let data = [
        {currency: 'USD', amount: 20}, 
        {currency: 'EUR', amount: 0}
    ]
    expect(walletReducer(previousState, {type: 'EXCHANGE_WALLET_CURRENCIES', data: data})).toEqual([
        {currency: 'USD', amount: 20}, 
        {currency: 'EUR', amount: 0}
    ])
})
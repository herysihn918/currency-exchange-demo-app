import {changeExchangeRates, exchangeWallet} from './actions'

test('change rate action test', () => {
    let oldState = [{currency: 'USD', rate: 1}]
    let data = {'USD': 0.8}
    expect(changeExchangeRates(oldState, data)).toEqual([{currency: 'USD', rate: 0.8}])
})

test('exchange action test', () => {
    let oldState = [
        {currency: 'USD', amount: 10}, 
        {currency: 'EUR', amount: 10}
    ]
    let data = [
        {currency: 'USD', amount: 20}, 
        {currency: 'EUR', amount: 0}
    ]
    expect(exchangeWallet(oldState, data)).toEqual([
        {currency: 'USD', amount: 20}, 
        {currency: 'EUR', amount: 0}
    ])
})
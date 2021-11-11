import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const LoadingScreen = () => {
    return (
        <div className="loading-screen flex-display flex-center">
            <span>Loading</span>
        </div>
    )
}

export const ExchangeController = () => {
    const wallet = useSelector(state => state.wallet)
    const dispatch = useDispatch()
    
    const [firstWallet, setFirstWallet] = useState(0)
    const [firstValue, setFirstValue] = useState(0)
    const [secondWallet, setSecondWallet] = useState(1)
    const [secondValue, setSecondValue] = useState(0)
    const [exchangeRate, setExchangeRate] = useState(1)

    useEffect(() => {
        setExchangeRate(Math.round(wallet[secondWallet].rate / wallet[firstWallet].rate * 10000) / 10000)
    }, [wallet, setExchangeRate, firstWallet, secondWallet])

    useEffect(() => {
        setSecondValue(Math.round(firstValue * exchangeRate * 100) / 100)
    }, [exchangeRate, firstValue, setSecondValue])

    const changeFirstExchangeAmount = (value) => {
        setFirstValue(value)
    }
    const changeSecondExchangeAmount = (value) => {
        setFirstValue(Math.round(value / exchangeRate * 100) / 100)
    }
    const changeFirstCurrency = (currencyIdx) => {
        setFirstWallet(currencyIdx)
    }
    const changeSecondCurrency = (currencyIdx) => {
        setSecondWallet(currencyIdx)
    }
    const exchangeCurrencies = () => {
        dispatch({
            type: 'EXCHANGE_WALLET_CURRENCIES',
            data: [
                {currency: wallet[firstWallet].currency, amount: wallet[firstWallet].amount - firstValue},
                {currency: wallet[secondWallet].currency, amount: wallet[secondWallet].amount + secondValue}
            ] 
        })
        setFirstValue(0); setSecondValue(0)
    }

    return (
        <>
        <div style={{padding: 24}}>
            <div className="flex-display" style={{fontSize: '12px'}}>
                <div style={{flex: 1}}>
                    <div>
                        <select value={firstWallet.toString()} onChange={e => changeFirstCurrency(Number(e.target.value))}>
                            {wallet.map((ele, idx) => (
                                <option key={ele.currency} disabled={idx === secondWallet} value={idx.toString()}>{ele.currency}</option>
                            ))}
                        </select>
                    </div>
                    <span className="input-prefix">-</span>
                    <input 
                        type="number" 
                        value={firstValue === 0 ? '' : firstValue.toString()} 
                        onChange={e => changeFirstExchangeAmount(e.target.value === '' ? 0 : Number(e.target.value))} 
                        data-testid='firstValue'
                    />
                    <div className="exceeds-balance">{firstValue > wallet[firstWallet].amount ? 'Exceeds balance' : <>&nbsp;</>}</div>
                </div>
                <div className="flex-display flex-center exchange-rate" style={{flex: 1}}>
                    {wallet[firstWallet].symbol}1 = {wallet[secondWallet].symbol}{exchangeRate}
                </div>
                <div className="flex-display" style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end'}}>
                    <div>
                        <select value={secondWallet.toString()} onChange={e => changeSecondCurrency(Number(e.target.value))}>
                            {wallet.map((ele, idx) => (
                                <option key={ele.currency} disabled={idx === firstWallet} value={idx.toString()}>{ele.currency}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <span className="input-prefix">+</span>
                        <input 
                            type="number" 
                            value={secondValue === 0 ? '' : secondValue.toString()} 
                            onChange={e => changeSecondExchangeAmount(e.target.value === '' ? 0 : Number(e.target.value))} 
                            data-testid='secondValue'
                        />
                    </div>
                    <div>&nbsp;</div>
                </div>
            </div>
        </div>
        <div className="text-center">
            <div className="text-center" style={{flex: 1}}>
                <button className="exchange-button flex-display flex-center" disabled={firstValue === 0 || firstValue > wallet[firstWallet].amount} onClick={exchangeCurrencies}>
                    Exchange
                </button>
            </div>
        </div>
        </>
    )
}

export const WalletShower = () => {
    const wallet = useSelector(state => state.wallet)
    return (
        <div className="flex-display" style={{paddingTop: 12, paddingBottom: 16}}>
            {wallet.map(ele => (
                <div key={ele.currency} style={{flex: 1, textAlign: 'center'}}>
                    <div className="currency-symbol">{ele.currency}</div>
                    <div>{ele.symbol}{Math.round(ele.amount * 100) / 100}</div>
                </div>
            ))}
        </div>
    )
}

export const ExchangeCard = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type: 'REQUEST_EXCHANGE_RATES'})
    }, [dispatch])
    return (
        <div className="card">
            <div className="card-header">
                Wallet Management
            </div>
            <div className="card-body">
                <ExchangeController />
                <div style={{padding: 24, background: '#eee', borderRadius: '0 0 8px 8px'}}>
                    <WalletShower />
                </div>
            </div>
        </div>
    )
}

export const Notification = ({message}) => {
    const [show, setShow] = useState(true)
    useEffect(() => {
        setTimeout(() => setShow(false), 2000)
    }, [setShow])
    return (
        <>
        <div className="flex-display flex-center" style={{position: 'fixed', zIndex: 10, left:0, right: 0, top: 10,}}>
            <div className="notification" style={{opacity: show ? 1 : 0}}>
                {message}
            </div>
        </div>
        </>
    )
}
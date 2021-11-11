export const changeExchangeRates = (oldState = [], data={}) => {
    let newState = [...oldState]
    oldState.forEach((ele, idx) => {
        if (ele.currency in data) {
            newState[idx].rate = data[ele.currency]
        }
    })
    return newState
}


export const exchangeWallet = (oldState = [], data=[]) => {
    let newState = [...oldState]
    data.forEach(ele => {
        let index = newState.findIndex(item => item.currency === ele.currency)
        newState[index].amount = ele.amount
    })

    return newState
}
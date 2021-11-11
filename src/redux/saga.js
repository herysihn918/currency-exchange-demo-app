import { all, call, put, takeLatest } from 'redux-saga/effects'

const API_KEY = process.env.REACT_APP_API_KEY

function* getExchangeRates(action) {
    try {
        const response = yield call (() => fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&symbols=GBP,USD,EUR`))
        if (response.ok) {
            const json = yield call([response, 'json'])
            yield put({ type: 'NEW_EXCHANGE_RATES', data: json.rates })
            yield put({ type: 'REQUEST_SUCCESS' })
        } else {
            yield put({ type: 'REQUEST_FAILED', message: response.statusText === '' ? 'Failed to get latest exchange rates' : response.statusText})
        }
    } catch (error) {
        console.log(error)
        yield put({ type: 'REQUEST_FAILED', message: 'API error ocurred ...' })
    }
}

// action watcher
function* tradeWatcher() {
    yield takeLatest('REQUEST_EXCHANGE_RATES', getExchangeRates)
}

// root saga
export default function* rootSaga() {
    yield all([
        tradeWatcher(),
    ])
}
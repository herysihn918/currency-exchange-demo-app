import './App.css'
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider, useSelector } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './redux/reducer'
import rootSaga from './redux/saga'
import { ExchangeCard, LoadingScreen, Notification } from './components'

// redux, saga settings
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

const App = () => {
    const { loading, error, message } = useSelector(state => state.saga)
    return (
        <>
            <div className="flex-display flex-center full-size">
                <ExchangeCard />
            </div>
            { loading ? <LoadingScreen /> : null }
            { error ? <Notification message={message} /> : null}
        </>
    );
}

export default () => <Provider store={store}><App /></Provider>

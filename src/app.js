import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense } from './actions/expenses'

import 'react-dates/lib/css/_datepicker.css'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

import './firebase/firebase'

const store = configureStore()

store.dispatch(addExpense({ id: '1000', description: 'Water bill', amount: 4500, createdAt: 1558420438871 }))
store.dispatch(addExpense({ id: '1001', description: 'Gas bill', amount: 2000, createdAt: 10000000000 }))
store.dispatch(addExpense({ id: '1002', description: 'Rent', amount: 10950, createdAt: 40000000000 }))

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))

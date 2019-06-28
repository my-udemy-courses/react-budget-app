import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

// ----- Action Generators ----
// ADD_EXPENSE
const addExpense = (
    { 
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

// REMOVE_EXPENSE
const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE', 
    id
})

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

// SORT_BY_DATE
const sortByDate = ({ descending = true } = {}) => ({
    type: 'SORT_BY_DATE',
    descending
})

// SORT_BY_AMOUNT
const sortByAmount = ({ descending = true } = {}) => ({
    type: 'SORT_BY_AMOUNT',
    descending
})

// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

// SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

// ----- Reducers -------
// Expenses Reducer
const expensesReducerDefaultState = []
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE': {
            return [
                ...state,
                action.expense
            ]
        }
        case 'REMOVE_EXPENSE': {
            return state.filter(({ id }) => id !== action.id)
        }
        case 'EDIT_EXPENSE': {
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })
        }
        default: {
            return state
        }
    }
}

// FilterReducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
    descending: true
}
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER': {
            return {
                ...state,
                text: action.text
            }
        }
        case 'SORT_BY_DATE': {
            return {
                ...state,
                sortBy: 'date',
                descending: action.descending
            }
        }
        case 'SORT_BY_AMOUNT': {
            return {
                ...state,
                sortBy: 'amount',
                descending: action.descending
            }
        }
        case 'SET_START_DATE': {
            return {
                ...state,
                startDate: action.startDate
            }
        }
        case 'SET_END_DATE': {
            return {
                ...state,
                endDate: action.endDate
            }
        }
        default: {
            return state
        }
    }
}

// Get visible expenses => Filter Logic
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate, descending }) => {
    return expenses.filter(({ description, createdAt }) => {
        const startDateMatch = typeof startDate !== 'number' || createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || createdAt <= endDate
        const textMatch = description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            if (descending){
                return a.createdAt < b.createdAt ? 1 : -1
            } else {
                return a.createdAt < b.createdAt ? -1 : 1
            }
        } 
        else if (sortBy === 'amount') {
            if (descending) {
                return a.amount < b.amount ? 1 : -1
            } else {
                return a.amount < b.amount ? -1 : 1
            }
        }
    })
}

// ----- Store creation -----
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
})

// ----- Dispatching actions -> changing state using action generator methods
const expenseOne = store.dispatch(addExpense({
    description: 'Rent', amount: 100, createdAt: -31000
}))
const expenseTwo = store.dispatch(addExpense({
    description: 'Coffee', amount: 300, createdAt: -1000
}))
const expenseThree = store.dispatch(addExpense({
    description: 'Bills', amount: 500, createdAt: 0
}))

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// store.dispatch(setTextFilter('e'))
// store.dispatch(setTextFilter())

// store.dispatch(sortByDate({ descending: false }))
store.dispatch(sortByAmount({ descending: false }))

// store.dispatch(setStartDate(125))
// store.dispatch(setStartDate())
// store.dispatch(setStartDate(1250))

const demoState = {
    expenses: [{
        id: 'asdlflaösdlfkj',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 45000,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
}

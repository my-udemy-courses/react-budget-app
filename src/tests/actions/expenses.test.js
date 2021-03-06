import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
    startAddExpense,
    addExpense,
    removeExpense,
    editExpense,
    setExpenses,
    startSetExpenses,
    startRemoveExpense,
    startEditExpense
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const uid = '1234567890'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const expensesData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt }
    })
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done())
})

test('should setup remove expense action object', () => {
    const action = removeExpense('1234abc')
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '1234abc'
    })
})

test('should setup edit expense action object', () => {
    const action = editExpense('1234', {
        note: 'New note'
    })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '1234',
        updates: {
            note: 'New note'
        }
    })
})

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('should add expense to database and store', async (done) => {
    const store = createMockStore(defaultAuthState)
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000,
    }

    await store.dispatch(startAddExpense(expenseData))
    const actions = store.getActions()
    expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData,
        }
    })
    const snapshot = await database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    expect(snapshot.val()).toEqual(expenseData)
    done()
})

test('should add expense with defaults to database and store', async (done) => {
    const store = createMockStore(defaultAuthState)
    const expenseDefaults = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0,
    }
    await store.dispatch(startAddExpense())
    const actions = store.getActions()
    expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseDefaults,
        }
    })
    const snapshot = await database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    expect(snapshot.val()).toEqual(expenseDefaults)
    done()
})

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should fetch the expenses from database', async (done) => {
    const store = createMockStore(defaultAuthState)
    await store.dispatch(startSetExpenses())
    const actions = store.getActions()
    expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
    done()
})

test('should remove expense from database', async (done) => {
    const store = createMockStore(defaultAuthState)
    await store.dispatch(startSetExpenses())
    await store.dispatch(startRemoveExpense(expenses[0].id))
    const actions = store.getActions()
    expect(actions[1]).toEqual({
        type: 'REMOVE_EXPENSE',
        id: expenses[0].id
    })
    const snapshot = await database.ref(`users/${uid}/expenses/${expenses[0].id}`).once('value')
    expect(snapshot.val()).toBeFalsy()
    done()
})

test('should edit expense in database and store', async (done) => {
    const store = createMockStore(defaultAuthState)
    await store.dispatch(startSetExpenses())
    const updates = {
        note: 'updated Note',
        amount: 500,
    }
    await store.dispatch(startEditExpense(expenses[0].id, updates))
    const actions = store.getActions()
    expect(actions[1]).toEqual({
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates
    })
    const snapshot = await database.ref(`users/${uid}/expenses/${expenses[0].id}`).once('value')
    expect(snapshot.val().note).toBe(updates.note)
    done()
})

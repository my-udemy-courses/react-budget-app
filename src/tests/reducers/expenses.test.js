import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id,
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([ expenses[0], expenses[2], ])
})

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: 'lol',
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should add expense', () => {
    const newExpense = {
        id: '2345',
        description: 'New Expense',
        note: 'test',
        amount: 19500,
        createdAt: 10,
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense: newExpense
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([ ...expenses, newExpense ])
})

test('should edit expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {
            description: 'Yum Yum!',
        },
    }
    const state = expensesReducer(expenses, action)
    expect(state[0].description).toEqual('Yum Yum!')
})

test('should not edit expense if not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-234',
        updates: {
            description: 'Yum Yum!',
        },
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})
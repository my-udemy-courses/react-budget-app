import selectExpensesTotals from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should return 0 if no expense', () => {
    const total = selectExpensesTotals([])
    expect(total).toBe(0)
})

test('should add up a single expense', () => {
    const total = selectExpensesTotals([expenses[0]])
    expect(total).toBe(expenses[0].amount)
})

test('should add up multiple expenses', () => {
    const total = selectExpensesTotals(expenses)
    const expected = expenses[0].amount + expenses[1].amount + expenses[2].amount
    expect(total).toBe(expected)
})
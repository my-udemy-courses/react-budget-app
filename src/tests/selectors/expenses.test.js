import moment from 'moment'
import selectExpenses from '../../selectors/expenses'
import expenses from '../fixtures/expenses'


test('should filter by text value', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined,
        descending: true,
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([ expenses[2], expenses[1] ])
})

test('should filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined,
        descending: true,
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([ expenses[2], expenses[0] ])
})

test('should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(1, 'day'),
        descending: true,
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([ expenses[0], expenses[1] ])
})

test('should sort by date ascending then descending', () => {
    // ascending
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined,
        descending: false,
    }
    let result = selectExpenses(expenses, filters)
    expect(result).toEqual([ expenses[1], expenses[0], expenses[2] ])

    // descending
    filters.descending = true
    result = selectExpenses(expenses, filters)
    expect(result).toEqual([ expenses[2], expenses[0], expenses[1] ])
})

test('should sort by amount ascending then descending', () => {
    // ascending
    const filters = {
        text: '',
        sortBy: 'amount',
    }
    let result = selectExpenses(expenses, filters)
    expect(result).toEqual(expenses)

    filters.descending = true
    result = selectExpenses(expenses, filters)
    expect(result).toEqual([ expenses[2], expenses[1], expenses[0] ])
})
import moment from 'moment'
import { 
    setTextFilter, 
    sortByDate, 
    sortByAmount, 
    setStartDate, 
    setEndDate, 
    setDescending 
} from '../../actions/filters'

test('should generate set start date action object', () => {
    const action = setStartDate(moment(0))
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
})

test('should generate set end date action object', () => {
    const action = setEndDate(moment(0))
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
})

test('should generate set text filter action object', () => {
    const action = setTextFilter('klomp')
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'klomp'
    })
})

test('should generate set text filter action object with empty text', () => {
    const action = setTextFilter()
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})

test('should generate sort by date action object', () => {
    const action = sortByDate()
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
})

test('should generate sort by amount action object', () => {
    const action = sortByAmount()
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
})

test('should generate set descending action object with default true', () => {
    const action = setDescending()
    expect(action).toEqual({
        type: 'SET_DESCENDING',
        descending: true
    })
})

test('should generate set descending action object', () => {
    const action = setDescending(false)
    expect(action).toEqual({
        type: 'SET_DESCENDING',
        descending: false
    })
})
import React from 'react'
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import { setTextFilter, sortByAmount, sortByDate, setDescending, setStartDate, setEndDate } from '../actions/filters'

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    }
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate)
        this.props.setEndDate(endDate)
    }
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }))
    }
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value)
    }
    onSortChange = (e) => {
        const val = e.target.value
                    
        if (val === 'date') {
            this.props.sortByDate()
        } else {
            this.props.sortByAmount()
        }
    }
    render() {
        return (
            <div>
                <input 
                    className="text-filter"
                    type="text" 
                    value={this.props.filters.text} 
                    onChange={this.onTextChange}
                />
        
                <select onChange={this.onSortChange}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
        
                <label>
                    <input 
                        className="sort-direction"
                        type="checkbox" 
                        id="ascending-checkbox" 
                        onChange={(e) => {
                            this.props.setDescending(!e.target.checked)
                        }} 
                        checked={!this.props.filters.descending}
                    />
                    Ascending
                </label>
        
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={(date) => false}
                    showClearDates={true}
                />
        
            </div>
        )        
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setDescending: (isDescending) => dispatch(setDescending(isDescending)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)
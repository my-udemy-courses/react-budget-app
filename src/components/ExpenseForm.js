import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props)
        const { expense = null } = props
        this.state = {
            description: expense ? expense.description : '',
            note: expense ? expense.note : '',
            amount: expense ? (expense.amount / 100).toString() : '',
            createdAt: expense ? moment(expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }
    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({ description }))
    }
    onNoteChange = (e) => {
        const note = e.target.value
        this.setState(() => ({ note }))
    }
    onAmountChange = (e) => {
        const amount = e.target.value

        // Only allow digits and with two decimal places at most
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }))
        }
    }
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }))
        }

    }
    onCalendarFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    }
    onSubmit = (e) => {
        e.preventDefault()

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Bitte mindestens Beschreibung und Höhe der Ausgabe angeben.' }))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    }
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                { this.state.error && <p className="form__error">{this.state.error}</p> }
                <input
                    type="text"
                    placeholder="Beschreibung"
                    autoFocus
                    className="text-input"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    type="text"
                    placeholder="Höhe der Ausgabe in €"
                    className="text-input"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onCalendarFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false} // every day is allowed aka in range
                />
                <textarea
                    placeholder="Notiz (optional)"
                    className="textarea"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >
                </textarea>
                <div>
                    <button className="button">{ this.props.buttonLabel ? this.props.buttonLabel : 'Speichern' }</button>
                    { this.props.deleteButton && this.props.deleteButton }
                    { this.props.cancelButton && this.props.cancelButton }
                </div>
            </form>
        )
    }
}

import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { editExpense, startRemoveExpense } from '../actions/expenses'

export class EditExpensePage extends React.Component {
    onSubmit = (updatedExpense) => {
        this.props.editExpense(this.props.expense.id, updatedExpense)
        this.props.history.push('/')
    }
    onRemove = () => {
        this.props.startRemoveExpense(this.props.expense.id)
        this.props.history.push('/')    
    }
    render() {
        return (
            <div>
                <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                    buttonLabel={'Update Expense'}
                />
                <button onClick={this.onRemove}>Remove Expense</button>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
    editExpense: (id, updatedExpense) => dispatch(editExpense(id, updatedExpense)),
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)
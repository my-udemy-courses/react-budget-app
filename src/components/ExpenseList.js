import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'

export const ExpenseList = ({expenses}) => {
    return (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Ausgaben</div>
            <div className="show-for-desktop">Ausgabe</div>
            <div className="show-for-desktop">Höhe</div>
        </div>
        <div className="list-body">
            {
                expenses.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>Keine Ausgaben</span>
                    </div>
                ) : (
                    expenses.map(expense => (
                        <ExpenseListItem key={expense.id} {...expense} />
                    ))
                )
            }
        </div>
    </div>)
}

const mapStateToProps = (state) => ({
    expenses: selectExpenses(state.expenses, state.filters)
})

export default connect(mapStateToProps)(ExpenseList)

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total'

export const ExpensesSummary = (props) => {
    const expenseWord = props.expensesCount === 1 ? 'Ausgabe' : 'Ausgaben'
    const formattedTotal = numeral(props.expensesTotal / 100).format('0,0.00') + ' €'

    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title"><span>{props.expensesCount}</span> {expenseWord}, insgesamt <span>{formattedTotal}</span></h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Ausgabe hinzufügen</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const expenses = selectExpenses(state.expenses, state.filters)
    return {
        expensesCount: expenses.length,
        expensesTotal: selectExpensesTotal(expenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary)

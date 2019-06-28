import React from 'react'
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

let removeExpenseSpy, editExpenseSpy, historySpy, wrapper

beforeEach(() => {
    editExpenseSpy = jest.fn()
    removeExpenseSpy = jest.fn()
    historySpy = { push: jest.fn() }

    wrapper = shallow(<EditExpensePage
        expense={expenses[0]} 
        editExpense={editExpenseSpy} 
        removeExpense={removeExpenseSpy}
        history={historySpy}
    />)
})

test('should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
    expect(historySpy.push).toHaveBeenLastCalledWith('/')
    expect(editExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id, expenses[1])
})

test('should handle removeExpense', () => {
    wrapper.find('button').simulate('click')
    expect(historySpy.push).toHaveBeenLastCalledWith('/')
    expect(removeExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id)
})
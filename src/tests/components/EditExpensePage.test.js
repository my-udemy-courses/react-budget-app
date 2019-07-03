import React from 'react'
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

let startRemoveExpenseSpy, startEditExpenseSpy, historySpy, wrapper

beforeEach(() => {
    startEditExpenseSpy = jest.fn()
    startRemoveExpenseSpy = jest.fn()
    historySpy = { push: jest.fn() }

    wrapper = shallow(<EditExpensePage
        expense={expenses[0]} 
        startEditExpense={startEditExpenseSpy} 
        startRemoveExpense={startRemoveExpenseSpy}
        history={historySpy}
    />)
})

test('should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
    expect(historySpy.push).toHaveBeenLastCalledWith('/')
    expect(startEditExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id, expenses[1])
})

test('should handle startRemoveExpenseSpy', () => {
    wrapper.find('button').simulate('click')
    expect(historySpy.push).toHaveBeenLastCalledWith('/')
    expect(startRemoveExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id)
})

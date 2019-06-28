import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary' 

test('should render expense summary with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary 
        expensesCount={1} 
        expensesTotal={12.5}/>)

    expect(wrapper).toMatchSnapshot()
})

test('should render expense summary with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary 
        expensesCount={4} 
        expensesTotal={120.5}/>)

    expect(wrapper).toMatchSnapshot()
})
import React from 'react'
import { shallow } from 'enzyme'
import BudgetDashboardPage from '../../components/BudgetDashboardPage'

test('should render not found page', () => {
    const wrapper = shallow(<BudgetDashboardPage />)
    expect(wrapper).toMatchSnapshot()
})
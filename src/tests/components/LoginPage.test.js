import React from 'react'
import { shallow } from 'enzyme'
import { LoginPage } from '../../components/LoginPage'

test('should render login page', () => {
    const wrapper = shallow(<LoginPage startLogin={() => {}}/>)
    expect(wrapper).toMatchSnapshot()
})

test('should call startLogin on button click', () => {
    let loginSpy = jest.fn()
    const wrapper = shallow(<LoginPage startLogin={loginSpy}/>)
    wrapper.find('button').simulate('click')
    expect(loginSpy).toHaveBeenCalled()
})
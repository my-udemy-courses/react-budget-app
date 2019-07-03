import React from 'react'
import { shallow } from 'enzyme'
import { Header } from '../../components/Header'

let logoutSpy = jest.fn()

test('should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={logoutSpy}/>)
    expect(wrapper).toMatchSnapshot()
    
    //expect(wrapper.find('h1').text()).toBe('Budget App')
    // const renderer = new ReactShallowRenderer()
    // renderer.render(<Header />)
    // expect(renderer.getRenderOutput()).toMatchSnapshot()

    // console.log(renderer.getRenderOutput())
})

test('should call startLogout on button click', () => {
    const wrapper = shallow(<Header startLogout={logoutSpy}/>)
    wrapper.find('button').simulate('click')
    expect(logoutSpy).toHaveBeenCalled()
})
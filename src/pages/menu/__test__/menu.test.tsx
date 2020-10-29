import React from 'react'
import { shallow } from 'enzyme'
import Menu from '../index'

describe('Menu page', () => {
  it('should render correctly', () => {
    const component = shallow(<Menu />)
    expect(component).toMatchSnapshot()
  })
})

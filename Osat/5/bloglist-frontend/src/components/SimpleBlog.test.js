import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders correctly', () => {
    const simpleBlog = {
      author: 'testi',
      title: 'testii',
      url: 'test',
      likes: 0
    }

    const blogComponent = shallow(<SimpleBlog blog={simpleBlog} />)
    const author = blogComponent.find('.info')
    const title = blogComponent.find('.info')
    const likes = blogComponent.find('.likes')

    console.log(blogComponent.debug())
    console.log(author.debug())

    expect(author.text()).toContain(simpleBlog.author)
    expect(title.text()).toContain(simpleBlog.title)
    expect(likes.text()).toContain(simpleBlog.likes)
  })
})
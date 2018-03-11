import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

it('clicking the button get a like', () => {
    const blog = {
        author: 'testi',
        title: 'testii',
        url: 'test',
        likes: 0
      }
  
    const mockHandlerRemove = jest.fn()
    const mockHandlerLike = jest.fn()
  
    const blogComponent = shallow(
      <Blog
        blog={blog}
        removeBlog={mockHandlerRemove}
        likeBlog={mockHandlerLike}
      />
    )

    console.log(blogComponent.debug())
    const button = blogComponent.find('.like')
    button.simulate('click')
  
    expect(mockHandlerLike.mock.calls.length).toBe(1)
  })
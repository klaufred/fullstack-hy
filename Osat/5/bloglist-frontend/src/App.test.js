import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import BlogService from './services/blogs'

describe('<App />', () => {
  let app
  describe('when user is not logged', () => {
    beforeEach(() => {
        app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      console.log(blogComponents.debug())
      expect(blogComponents.length).toEqual(3)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
        }

        localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        app = mount(<App />)
    })

    it('all notes are rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      console.log(blogComponents.debug())
      expect(blogComponents.length).toEqual(3)
    })
  })
})
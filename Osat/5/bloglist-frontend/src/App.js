import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
      username: '',
      password: '',
      user: '',
      title: '',
      author: '',
      url: '',
      error: null,
      loginVisible: true
    }
  }

  removeBlog = (id) => () => {
    const blog = this.state.blogs.find(blog=>blog._id===id)
    const ok = window.confirm(`Poistetaanko ${blog.title}`)
    if (!ok) {
      return
    }
    console.log(id)
    blogService
      .remove(id)
      .then(response => {
        this.setState({ 
          blogs: this.state.blogs.filter(blog=>blog._id!==id) 
        })
      })
  }
  likeBlog = (blog) => () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes++
    }
    console.log(blogObject)

    blogService
      .update(blog._id, blogObject)
  }

  addBlog = (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    console.log(this.state.title, this.state.author, this.state.url)

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: '',
          title: '',
          author: '',
          url: ''
        })
      })
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    this.setState({ blogs: this.state.blogs.sort() })
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  handleBlogUrlChange = (event) => {
    this.setState({ url: event.target.value })
  }
  handleBlogTitleChange = (event) => {
    this.setState({ title: event.target.value })
  }
  handleBlogAuthorChange = (event) => {
    this.setState({ author: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }


  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
  logout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    try{
      window.localStorage.removeItem('loggedUser')
      this.setState({ username: '', password: '', user: null})
    } catch(exception) {
      this.setState({
        error: 'ei pysty kirjautumaan ulos',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {
    const blogForm = () => (
      <Togglable buttonLabel="new blog"  ref={component => this.blogForm = component}>
        <BlogForm
          onSubmit={this.addBlog}
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
          handleBlogTitleChange={this.handleBlogTitleChange}
          handleBlogAuthorChange={this.handleBlogAuthorChange}
          handleBlogUrlChange={this.handleBlogUrlChange}
        />
      </Togglable>
    )
    
    if (this.state.user === null) {
      return (
        <div>
          <h2>Kirjaudu sovellukseen</h2>
          <Notification message={this.state.error}/>
          <form onSubmit={this.login}>
            <div>
              käyttäjätunnus
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <div>
              salasana
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <button type="submit">kirjaudu</button>
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <h2>blogs</h2>
          <button onClick={this.logout}>logout</button>
          {this.state.blogs.map(blog =>
            <Blog key={blog._id} blog={blog} likeBlog={this.likeBlog} removeBlog={this.removeBlog} user={this.state.user} />
          )}
          {this.state.user !== null && blogForm()}
        </div>
        
      )
    }
  }
}

export default App;
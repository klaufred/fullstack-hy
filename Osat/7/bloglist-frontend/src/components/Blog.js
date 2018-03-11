import React from 'react'
import { Well } from 'react-bootstrap'

class Blog extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }
  render() {
    const { blog, like, deletable, remove } = this.props

    const style = {
      border: '1px solid powderblue',
      padding: 10,
      borderWidth: 1,
      color: 'blue',
      backgroundColor: "#00B1E1"
    }

    const contentStyle = {
      display: this.state.visible? '' : 'none',
      margin: 5,
    }

    const adder = blog.user ? blog.user.name : 'anonymous'

    return (
      <div style={style}>
        <div 
          onClick={() => this.setState({ visible: !this.state.visible })} 
          className='name'
        >
          {blog.title} {blog.author}
        </div>
        <div style={contentStyle} className='content'>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} likes <button onClick={like}>like</button>
          </div>
          <div>
            added by {adder}
          </div>
          {deletable && <div><button onClick={remove}>delete</button></div>}
        </div>
      </div>  
    )
  }
}

export default Blog
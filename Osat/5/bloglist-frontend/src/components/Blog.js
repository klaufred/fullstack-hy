import React from 'react'

const Blog = ({blog, removeBlog, likeBlog, user}) => (
  <div>
    {blog.title} {blog.author}
    <div className="like">
      <button onClick={likeBlog(blog)}>like</button>
     </div>
    <button onClick={removeBlog(blog._id)}>poista</button>
  </div>  
)

export default Blog
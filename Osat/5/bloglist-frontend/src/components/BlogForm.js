import React from 'react'
const BlogForm = ({title, author, url, onSubmit, handleBlogUrlChange,handleBlogTitleChange, handleBlogAuthorChange , value}) => {
  return (
  <div>
    <h2>Luo uusi blogi</h2>
    <form onSubmit={onSubmit}>
    <div>
          Title
          <input
            value={title}
            onChange={handleBlogTitleChange}
          />
     </div>
     <div>
          Author
          <input
            value={author}
            onChange={handleBlogAuthorChange}
          />
     </div>
     <div>
          Url
          <input
            value={url}
            onChange={handleBlogUrlChange}
          />
     </div>
      <button type="submit">tallenna</button>
    </form>
  </div>
  )
}

export default BlogForm
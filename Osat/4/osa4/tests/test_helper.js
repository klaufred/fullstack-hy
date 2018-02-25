const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Testi",
        author: "Minä",
        url: "https://fullstack-hy.github.io/osa4/",
        likes: "1"
      },
      {
        title: "Testi2",
        author: "Sinä",
        url: "https://fullstack-hy.github.io/osa5/",
        likes: "2"
      }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs
}

const usersInDb = async () => {
  const users = await User.find({})
  return users
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}
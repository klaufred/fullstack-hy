const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, blogsInDb, usersInDb } = require('./test_helper')


beforeAll(async () => {
  await Blog.remove({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
  
    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "Testi3",
        author: "Hän",
        url: "https://fullstack-hy.github.io/osa1/",
        likes: "3"
      }
  
    const blogsBefore = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api
      .get('/api/blogs')
  
    const blogsAfter = await blogsInDb()
    const titles = blogsAfter.map(r => r.title)

    expect(blogsAfter.length).toBe(blogsBefore.length+1)
    expect(titles).toContain(newBlog.title)
  })

  test('blogs without likes have 0 likes', async () => {
    const newBlog = {
        title: "Testi4",
        author: "Te",
        url: "https://fullstack-hy.github.io/osa1/"
      }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
  
    const response = await api
      .get('/api/blogs')
    
      const likes = response.body.map(r => r.likes)
      console.log(likes)
      expect(likes).toContain(0)
  })

  test('blogs without title and url are not added ', async () => {
    const newBlog = {
        author: "He",
        likes: "1"
      }
  
    const initialBlogs = await api
      .get('/api/blogs')
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await api
      .get('/api/blogs')
  
    const contents = response.body.map(r => r.content)
  
    expect(response.body.length).toBe(initialBlogs.body.length)
  })

describe('deletion of a blog', async () => {
    let addedBlog

    beforeAll(async () => {
        addedBlog = new Blog({
            title: "TestiPOIsto",
            author: "Hän",
            url: "https://fullstack-hy.github.io/osa1/",
            likes: "3"
        })
      await addedBlog.save()
    })

  test('blogs can be deleted ', async () => {
    const blogsBefore = await blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog._id}`)
      .expect(204)

    const blogsAfter = await blogsInDb()

    const titles = blogsAfter.map(r => r.title)

    expect(blogsAfter.length).toBe(blogsBefore.length-1)
    expect(blogsAfter).not.toContain(addedBlog.title)
  })
 })

 describe.only('when there is initially one user at db', async () => {
    beforeAll(async () => {
      await User.remove({})
      const user = new User({ username: 'root', password: 'sekret' })
      await user.save()
    })
  
    test('POST /api/users succeeds with a fresh username', async () => {
      const usersBeforeOperation = await usersInDb()
  
      const newUser = {
        username: 'testaaaja',
        name: 'testi',
        password: 'ssshhhh'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
      const usernames = usersAfterOperation.map(u=>u.username)
      expect(usernames).toContain(newUser.username)
    })
    test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
        const usersBeforeOperation = await usersInDb()
      
        const newUser = {
            username: 'root',
            name: 'testi',
            password: 'ssshhhh'
        }
      
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      
        expect(result.body).toEqual({ error: 'username must be unique'})
      
        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
      })

      test('POST /api/users fails with proper statuscode and message if password is too small', async () => {
        const usersBeforeOperation = await usersInDb()
      
        const newUser = {
            username: 'error',
            name: 'testi',
            password: 's'
        }
      
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      
        expect(result.body).toEqual({ error: 'too small password'})
      
        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
      })
  })

afterAll(() => {
  server.close()
})
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { Blog } = require('../models/blogSchema')
const { initialBlogs, nonExistingId, blogsInDB } = require('./test_helper')

// fills the DB with two obj before the test run
beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of initialBlogs) {
    let blogObj = new Blog(blog)
    await blogObj.save()
  }
})

describe('Exercises 4.8-4.12', () => {
  test('4.8: Verify that the blog list application returns the correct amount of blog posts in the JSON format.', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('4.9: Verifies that the unique identifier property of the blog posts is named id', async () => {
    const result = await api.get('/api/blogs')
    const blogsList = result.body
    for (let blog of blogsList) {
      expect(blog.id).toBeDefined()
    }
  })
  test('4.10: verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post.', async () => {
    const newBlog = { title: 'test with jest', author: 'jester', url: 'jest.com' }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/i)

    const blogsAtEnd = await blogsInDB()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
    const contents = blogsAtEnd.map((b) => b.title)
    expect(contents).toContain('test with jest')
  })

  test('4.11: Verifies that if the likes property is missing from the request, it will default to the value 0.', async () => {
    const newBlog = { title: 'Post with no likes prop', author: 'tester', url: 'jest.com' }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/i)
    const blog = response.body
    expect(blog.likes).toEqual(0)
  })
  test('4.8: verifies that if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async () => {
    const badBlog = { url: 'jest.com' }
    await api.post('/api/blogs').send(badBlog).expect(400)
  })
  // test('4.8: Blog list tests, step1', async () => {})
})

describe('Exercises 4.13-4.14', () => {
  test('deletes a single blog post', async () => {
    const blogsAtStart = await blogsInDB()
    const blogToDelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    const blogsAtEnd = await blogsInDB()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
    const contents = blogsAtEnd.map((b) => b.title)
    expect(contents).not.toContain(blogToDelete.title)
  })

  test('updates a single blog post', async () => {
    //
    const blogAtStart = await blogsInDB()
    const prevBlog = blogAtStart[0]
    const blogToUpdate = { title: 'updated correctly', likes: 100 }
    const response = await api.put(`/api/blogs/${prevBlog.id}`).send(blogToUpdate).expect(200)
    const updatedBlog = response.body
    expect(updatedBlog.title).toEqual('updated correctly')
    expect(updatedBlog.likes).toEqual(100)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

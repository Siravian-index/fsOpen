const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { Blog } = require('../models/blogSchema')
const { initialBlogs, nonExistingId, blogsInDB } = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObj = new Blog(initialBlogs[0])
  await blogObj.save()
  blogObj = new Blog(initialBlogs[1])
  await blogObj.save()
})

describe('basic test on the DB', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is a total of two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('tests blog routes', () => {
  test('a valid blog can be added', async () => {
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

  test('blog without title is not added', async () => {
    const newBlog = { author: 'jester', url: 'jest.com' }
    await api.post('/api/blogs').send(newBlog).expect(400)
    const blogsAtEnd = await blogsInDB()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await blogsInDB()
    const blogsToView = blogsAtStart[0]
    const resultBlog = await api
      .get(`/api/blogs/${blogsToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const processedBlogToView = JSON.parse(JSON.stringify(blogsToView))
    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await blogsInDB()
    const blogToDelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    const blogsAtEnd = await blogsInDB()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
    const contents = blogsAtEnd.map((b) => b.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

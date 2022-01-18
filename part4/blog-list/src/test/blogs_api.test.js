const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { Blog } = require('../models/blogSchema')
const initialBlogs = [
  { title: 'testing', author: 'david', url: 'www.reddit.com/myPost' },
  { title: 'Sample', author: 'Jhon', url: 'www.reddit.com/hisPost' },
]

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

afterAll(() => {
  mongoose.connection.close()
})

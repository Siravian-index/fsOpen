const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { Blog } = require('../models/blogSchema')
const { initialBlogs, nonExistingId, blogsInDB } = require('./test_helper')

// fills the DB with two obj before the test run
beforeEach(async () => {
  await Blog.deleteMany({})
  // Not so DRY option
  // let blogObj = new Blog(initialBlogs[0])
  // await blogObj.save()
  // blogObj = new Blog(initialBlogs[1])
  // await blogObj.save()
  // ----------------
  // Good ol' for, nothing beats it.
  for (let blog of initialBlogs) {
    let blogObj = new Blog(blog)
    await blogObj.save()
  }
  // ----------------
  // advanced solution using Promise.all()
  // const blogObjects = initialBlogs.map((blog) => new Blog(blog))
  // const promiseArray = blogObjects.map((blog) => blog.save())
  // console.log(promiseArray)
  // await Promise.all(promiseArray)
  // ----------------
})

// describe('basic test on the DB', () => {
//   test('blogs are returned as json', async () => {
//     await api
//       .get('/api/blogs')
//       .expect(200)
//       .expect('Content-Type', /application\/json/)
//   })

//   test('there is a total of two blogs', async () => {
//     const response = await api.get('/api/blogs')
//     expect(response.body).toHaveLength(initialBlogs.length)
//   })
// })

// describe('tests blog routes', () => {
//   test('a valid blog can be added', async () => {
// const newBlog = { title: 'test with jest', author: 'jester', url: 'jest.com' }
// await api
//   .post('/api/blogs')
//   .send(newBlog)
//   .expect(201)
//   .expect('Content-Type', /application\/json/i)

// const blogsAtEnd = await blogsInDB()
// expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
// const contents = blogsAtEnd.map((b) => b.title)
// expect(contents).toContain('test with jest')
//   })

//   test('blog without title is not added', async () => {
//     const newBlog = { author: 'jester', url: 'jest.com' }
//     await api.post('/api/blogs').send(newBlog).expect(400)
//     const blogsAtEnd = await blogsInDB()
//     expect(blogsAtEnd).toHaveLength(initialBlogs.length)
//   })

//   test('a specific blog can be viewed', async () => {
//     const blogsAtStart = await blogsInDB()
//     const blogsToView = blogsAtStart[0]
//     const resultBlog = await api
//       .get(`/api/blogs/${blogsToView.id}`)
//       .expect(200)
//       .expect('Content-Type', /application\/json/)
//     const processedBlogToView = JSON.parse(JSON.stringify(blogsToView))
//     expect(resultBlog.body).toEqual(processedBlogToView)
//   })

//   test('a blog can be deleted', async () => {
//     const blogsAtStart = await blogsInDB()
//     const blogToDelete = blogsAtStart[0]
//     await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
//     const blogsAtEnd = await blogsInDB()
//     expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
//     const contents = blogsAtEnd.map((b) => b.title)
//     expect(contents).not.toContain(blogToDelete.title)
//   })
// })

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
    //
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

afterAll(() => {
  mongoose.connection.close()
})

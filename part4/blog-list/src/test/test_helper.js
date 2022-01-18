const { Blog } = require('../models/blogSchema')
const initialBlogs = [
  { title: 'testing', author: 'david', url: 'www.reddit.com/myPost', likes: 5 },
  { title: 'Sample', author: 'Jhon', url: 'www.reddit.com/hisPost', likes: 10 },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'remove me', author: 'me', url: 'www.meme.com' })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map((b) => b.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDB }

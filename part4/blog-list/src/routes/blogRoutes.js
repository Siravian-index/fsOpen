const express = require('express')
const blogRouter = express.Router()
const blogController = require('../controllers/blogController')

blogRouter.get('/', blogController.allBlogs)
blogRouter.get('/:id', blogController.oneBlog)
blogRouter.post('/', blogController.newBlog)
blogRouter.delete('/:id', blogController.deleteBlog)

module.exports = { blogRouter }

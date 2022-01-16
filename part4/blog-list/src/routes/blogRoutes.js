const express = require('express')
const blogRouter = express.Router()
const blogController = require('../controllers/blogController')

blogRouter.get('/', blogController.allBlogs)
// blogRouter.get('/:id')
blogRouter.post('/', blogController.newBlog)
// blogRouter.delete('/:id')

module.exports = { blogRouter }

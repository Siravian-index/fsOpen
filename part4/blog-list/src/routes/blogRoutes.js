const express = require('express')
const blogRouter = express.Router()
const blogController = require('../controllers/blogController')
const blogMiddleware = require('../utils/middleware/blogMiddleware')

blogRouter.use(blogMiddleware.parseTokenFromHeader)

blogRouter.get('/', blogController.allBlogs)
blogRouter.get('/:id', blogController.oneBlog)
blogRouter.post('/', blogMiddleware.userExtractor, blogController.newBlog)
blogRouter.delete('/:id', blogMiddleware.userExtractor, blogController.deleteBlog)
blogRouter.put('/:id', blogController.updateBlog)

module.exports = { blogRouter }

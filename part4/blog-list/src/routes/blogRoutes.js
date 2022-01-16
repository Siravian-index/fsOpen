const express = require('express')
const blogRouter = express.Router()
const blogController = require('../controllers/blogController')

blogRouter.get('/', blogController.allBlogs)
blogRouter.post('/', blogController.newBlog)

module.exports = { blogRouter }

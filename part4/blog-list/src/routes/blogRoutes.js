const express = require('express')
const blogRouter = express.Router()
const blogController = require('../controllers/blogController')

blogRouter.get('/', blogController.allBlogs)
blogRouter.get('/:id', blogController.oneBlog)
blogRouter.post('/', blogController.newBlog)
blogRouter.delete('/:id', blogController.deleteBlog)

module.exports = { blogRouter }
// eeee
// funciona
// aaaaaaaa
// pero eso no me aviso haha
// no puede ser
//tenia una llave de mas -.-
// cuando se comento fue que pille eso tan raro jaja
// pero eso no me aviso por tener una llave de m'as
// tan raro a ver

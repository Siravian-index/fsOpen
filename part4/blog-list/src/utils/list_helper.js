const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((init, blog) => init + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  let j = 0
  const r = blogs.reduce((i, c) => {
    if (c.likes > j) {
      j = c.likes
      i.title = c.title
      i.likes = c.likes
      i.author = c.author
      return i
    }
    return i
  }, {})
  return r
}

const mostBlogs = (blogs) => {
  const r = blogs.reduce((i, c) => {
    if (Object.hasOwn(i, c.author)) {
      return (i = { ...i, [c.author]: { ...i[c.author], blogs: i[c.author].blogs + 1 } })
    } else {
      return (i = { ...i, [c.author]: { author: c.author, blogs: 1 } })
    }
  }, {})
  let j = 0
  return Object.values(r).reduce((i, c) => {
    if (c.blogs > j) {
      j = c.blogs
      i.author = c.author
      i.blogs = c.blogs
      return i
    }
    return i
  }, {})
}

const mostLikes = (blogs) => {
  const r = blogs.reduce((i, c) => {
    if (Object.hasOwn(i, c.author)) {
      return (i = { ...i, [c.author]: { ...i[c.author], likes: i[c.author].likes + c.likes } })
    } else {
      return (i = { ...i, [c.author]: { author: c.author, likes: c.likes } })
    }
  }, {})
  let j = 0
  return Object.values(r).reduce((i, c) => {
    if (c.likes > j) {
      j = c.likes
      i.author = c.author
      i.likes = c.likes
      return i
    }
    return i
  }, {})
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }

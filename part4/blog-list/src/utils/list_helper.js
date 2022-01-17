const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

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

const mostLikes = (blogs) => {}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
// if (Object.hasOwn(blog, blog.author)) {
//   console.log('prop already there')
// } else {
//   let authorName = blog.author
//   blog = { ...blog, [authorName]: true }
// }
// console.log(blog)

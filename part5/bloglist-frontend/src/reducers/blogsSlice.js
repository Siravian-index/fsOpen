import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as blogService from '../services/blogs'

const initialState = { blogs: [], status: 'idle', error: null }

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const res = await blogService.getAll()
  return res
})

export const addNewBlog = createAsyncThunk('blogs/addNewBlog', async (payload) => {
  const { newBlog, token } = payload
  const res = await blogService.createOne(newBlog, token)
  // the return from this asyncThunk are place in the action.payload at the extraReducers
  return res
})

export const addNewComment = createAsyncThunk('blogs/addNewComment', async (payload) => {
  const { comment, id, token } = payload
  const res = await blogService.newComment(comment, id, token)
  return res
})

export const likeBlog = createAsyncThunk('blogs/likeBlog', async (blog) => {
  const { id, author, url, title } = blog
  const baseUpdate = {
    user: blog.user?.id || blog.user,
    likes: blog.likes + 1,
    author,
    title,
    url,
  }
  const res = await blogService.editBlog(baseUpdate, id)
  return res
})

export const deleteBlog = createAsyncThunk('blog/deleteBlog', async (payload) => {
  const { blog, token } = payload
  const res = await blogService.deleteBlog(blog.id, token)
  return res
})

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // fetchBlogs case
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // map the obj so it has a key that holds the user values permanently
        state.blogs = state.blogs.concat(action.payload)
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // addNewBlog case
      .addCase(addNewBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload)
      })
      // likeBlog case
      .addCase(likeBlog.fulfilled, (state, action) => {
        const updatedBlog = action.payload
        state.blogs = state.blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      })
      // deleteBlog case
      .addCase(deleteBlog.fulfilled, (state, action) => {
        const deletedId = action.payload
        state.blogs = state.blogs.filter((blog) => blog.id !== deletedId)
      })
      // newComment case
      .addCase(addNewComment.fulfilled, (state, action) => {
        const blog = action.payload
        state.blogs = state.blogs.map((b) => (b.id !== blog.id ? b : blog))
      })
  },
})

// Action creators are generated for each case reducer function
// export const {  } = blogsSlice.actions

export default blogsSlice.reducer

// selector helpers
export const selectBlogsState = (state) => state.blogs
export const selectBlogFromArray = (state, id) => state.blogs.blogs.find((blog) => blog.id === id)

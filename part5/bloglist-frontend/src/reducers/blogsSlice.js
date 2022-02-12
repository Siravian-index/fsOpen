import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as blogService from '../services/blogs'

const initialState = { blogs: [], status: 'idle', error: null }

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const res = await blogService.getAll()
  return res
})

export const addNewBlog = createAsyncThunk('blogs/addNewBlog', async (blog, token) => {
  const res = await blogService.createOne(blog, token)
  return res
})

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    // add like
    test: (state) => {
      state.blogs = state.blogs.length
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.blogs = state.blogs.concat(action.payload)
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload)
      })
  },
})

// Action creators are generated for each case reducer function
export const { test } = blogsSlice.actions

export default blogsSlice.reducer

// selector helpers
export const selectBlogsState = (state) => state.blogs

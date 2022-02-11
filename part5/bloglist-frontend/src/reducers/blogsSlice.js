import { createSlice } from '@reduxjs/toolkit'

const initialState = { blogs: [] }

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    decrement: (state) => {
      state.blogs = state.blogs.length
    },
  },
})

// Action creators are generated for each case reducer function
export const { decrement } = blogsSlice.actions

export default blogsSlice.reducer

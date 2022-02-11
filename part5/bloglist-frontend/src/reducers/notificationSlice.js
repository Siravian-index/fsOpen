import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', timeoutId: null }

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    decrement: (state) => {
      state.value -= 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { decrement } = notificationSlice.actions

export default notificationSlice.reducer

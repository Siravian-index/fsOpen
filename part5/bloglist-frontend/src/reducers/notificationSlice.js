import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: 'refactoring', timeoutId: null }

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      // if (state.timeoutId) {
      //   clearTimeout(state.timeoutId)
      // }
      state.message = action.payload
    },
    hideNotification: (state) => {
      state.message = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { showNotification, hideNotification } = notificationSlice.actions

export default notificationSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, error: null }

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error
      }
      state.message = action.payload.message
    },
    hideNotification: (state) => {
      state.message = null
      state.error = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { showNotification, hideNotification } = notificationSlice.actions

export default notificationSlice.reducer

// selector helpers
export const selectNotificationObj = (state) => state.notification

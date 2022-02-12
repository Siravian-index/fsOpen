import { configureStore } from '@reduxjs/toolkit'
import blogsSlice from '../reducers/blogsSlice'
import notificationSlice from '../reducers/notificationSlice'
import userSlice from '../reducers/userSlice'

export const store = configureStore({
  reducer: { blogs: blogsSlice, notification: notificationSlice, user: userSlice },
})

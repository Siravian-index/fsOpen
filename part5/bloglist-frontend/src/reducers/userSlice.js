import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// local imports
import * as loginService from '../services/login'

const initialState = { name: null, token: null, username: null }

export const logUser = createAsyncThunk('user/logUser', async (payload) => {
  const res = await loginService.login(payload)
  return res
})

export const usersSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // setUser
    // clearUser
  },
  extraReducers(builder) {
    builder.addCase(logUser.fulfilled, (state, action) => {
      // should be the user info
      console.log('user?', action.payload)
      // localStorageUtility.saveToLocalStorage('currentUser', userData)
      return action.payload
    })
  },
})

// Action creators are generated for each case reducer function
// export const {} = usersSlice.actions

export default usersSlice.reducer

// selector helpers
export const selectUserObj = (state) => state.user

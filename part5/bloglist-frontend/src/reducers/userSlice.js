import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// local imports
import * as loginService from '../services/login'
import * as localStorageUtility from '../utils/localStorageUtility'

const initialState = { name: null, token: null, username: null }

export const logUser = createAsyncThunk('user/logUser', async (payload) => {
  const res = await loginService.login(payload)
  localStorageUtility.saveToLocalStorage(localStorageUtility.LOCAL_STORAGE_USER_KEY, res)
  return res
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    readUserFromLocalStorage: () => {
      const userFound = localStorageUtility.parseFromLocalStorage(localStorageUtility.LOCAL_STORAGE_USER_KEY)
      if (userFound) {
        return userFound
      }
      console.log('not user found')
    },
    clearUserFromStateAndStorage: () => {
      localStorageUtility.deleteFromLocalStorage(localStorageUtility.LOCAL_STORAGE_USER_KEY)
      return { name: null, token: null, username: null }
    },
  },
  extraReducers(builder) {
    builder.addCase(logUser.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { clearUserFromStateAndStorage, readUserFromLocalStorage } = userSlice.actions

export default userSlice.reducer

// selector helpers
export const selectUserObj = (state) => state.user
export const selectUserToken = (state) => state.user.token

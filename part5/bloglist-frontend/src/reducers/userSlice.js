import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// local imports
import * as loginService from '../services/login'
import * as localStorageUtility from '../utils/localStorageUtility'

const initialState = { name: null, token: null, username: null }

const LOCAL_STORAGE_USER_KEY = 'currentUser'
export const logUser = createAsyncThunk('user/logUser', async (payload) => {
  const res = await loginService.login(payload)
  localStorageUtility.saveToLocalStorage(LOCAL_STORAGE_USER_KEY, res)
  return res
})

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserFromLocalStorage: () => {
      const userFound = localStorageUtility.parseFromLocalStorage(LOCAL_STORAGE_USER_KEY)
      if (userFound) {
        return userFound
      }
      console.log('not user found')
    },
    clearUserFromStateAndStorage: () => {
      localStorageUtility.deleteFromLocalStorage(LOCAL_STORAGE_USER_KEY)
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
export const { clearUserFromStateAndStorage, setUserFromLocalStorage } = usersSlice.actions

export default usersSlice.reducer

// selector helpers
export const selectUserObj = (state) => state.user

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// local imports
import * as usersServices from '../services/users'
const initialState = { users: [], status: 'idle', error: null }

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await usersServices.getAll()
  return res
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    test: () => {},
  },
  extraReducers(builder) {
    // fetchUsers case
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = state.users.concat(action.payload)
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

// Action creators are generated for each case reducer function
export const { test } = usersSlice.actions

export default usersSlice.reducer

// selector helpers
export const selectUsersState = (state) => state.users
export const selectUsersArray = (state) => state.users.users
export const selectUserFromArray = (state, id) => state.users.users.find((user) => user.id === id)

import * as anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'VOTED':
      // const INC = 1
      // const u = state.find((a) => a.id === action.data.id)
      const anecdote = action.data.anecdote
      return state.map((a) => (a.id !== anecdote.id ? a : anecdote))
    case 'ADD_ANECDOTE':
      return [...state, action.data.newAnecdote]
    case 'INIT_ANECDOTES':
      return action.data.anecdotes
    default:
      return state
  }
}

// -----------------------
// actions creators

export const vote = (anecdoteObj) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdoteObj }
    updatedAnecdote.votes++
    const res = await anecdoteService.putAnecdote(updatedAnecdote)
    const anecdote = res
    dispatch({
      type: 'VOTED',
      data: { anecdote },
    })
  }
}

export const addAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.postAnecdote(anecdote)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: { newAnecdote },
    })
  }
}

// thunk function
export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: { anecdotes },
    })
  }
}

// -----------------------
export default anecdoteReducer

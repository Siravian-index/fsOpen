const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTED':
      const INC = 1
      const u = state.find((a) => a.id === action.data.id)
      return state.map((a) => (a.id !== u.id ? a : { ...u, votes: u.votes + INC }))
    case 'ADD_ANECDOTE':
      return [...state, action.data.anecdote]
    case 'INIT_ANECDOTES':
      return action.data.anecdotes
    default:
      return state
  }
}

// -----------------------
// actions creators

export const vote = (id) => {
  return {
    type: 'VOTED',
    data: { id },
  }
}

export const addAnecdote = (anecdote) => {
  return {
    type: 'ADD_ANECDOTE',
    data: { anecdote },
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: { anecdotes },
  }
}

// -----------------------
export default anecdoteReducer

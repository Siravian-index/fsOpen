const initialState = ''

const filterAnecdotesReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'FILTER_ANECDOTES':
      return action.data.filter
    default:
      return state
  }
}

// -----------------------
// actions creators

export const filterAnecdotes = (filter) => {
  return {
    type: 'FILTER_ANECDOTES',
    data: { filter },
  }
}
// -----------------------
export default filterAnecdotesReducer

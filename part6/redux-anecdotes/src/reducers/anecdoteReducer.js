// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// // turns anecdote (str) into a obj
// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

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

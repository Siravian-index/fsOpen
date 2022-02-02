const initialState = 'Popular developer anecdotes'

const messageReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return action.msg
    case 'HIDE_MESSAGE':
      return action.msg
    default:
      return initialState
  }
}

// -----------------------
// actions creators

export const showMessage = (msg) => {
  return {
    type: 'SHOW_MESSAGE',
    data: { msg },
  }
}

export const hideMessage = () => {
  return {
    type: 'HIDE_MESSAGE',
    data: { msg: '' },
  }
}

// -----------------------
export default messageReducer

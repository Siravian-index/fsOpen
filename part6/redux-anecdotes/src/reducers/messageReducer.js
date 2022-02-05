const initialState = ''

const messageReducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'ADDED_MESSAGE':
      return `you added '${action.data.msg}'`
    case 'VOTED_MESSAGE':
      return `you voted '${action.data.msg}'`
    case 'HIDE_MESSAGE':
      return action.data.msg
    default:
      return state
  }
}

// -----------------------
// actions creators

export const addedMessage = (msg) => {
  return {
    type: 'ADDED_MESSAGE',
    data: { msg },
  }
}

export const hideMessage = () => {
  return {
    type: 'HIDE_MESSAGE',
    data: { msg: '' },
  }
}

export const votedMessage = (msg) => {
  return {
    type: 'VOTED_MESSAGE',
    data: { msg },
  }
}
// -----------------------
export default messageReducer

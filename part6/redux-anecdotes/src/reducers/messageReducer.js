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
const MILLISECONDS = 1000

export const addedMessage = (msg, delay) => {
  return (dispatch) => {
    dispatch({
      type: 'ADDED_MESSAGE',
      data: { msg },
    })
    setTimeout(() => {
      dispatch(hideMessage())
    }, delay * MILLISECONDS)
  }
}

export const hideMessage = () => {
  return {
    type: 'HIDE_MESSAGE',
    data: { msg: '' },
  }
}

export const votedMessage = (msg, delay) => {
  return (dispatch) => {
    dispatch({
      type: 'VOTED_MESSAGE',
      data: { msg },
    })
    setTimeout(() => {
      dispatch(hideMessage())
    }, delay * MILLISECONDS)
  }
}
// -----------------------
export default messageReducer

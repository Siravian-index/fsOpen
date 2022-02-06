const initialState = {
  text: null,
  timeoutId: null,
}

const messageReducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'SET_TIMEOUT_ID':
      return { text: state.text, timeoutId: action.data }
    case 'SHOW_NOTIFICATION':
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return { text: action.data, timeoutId: null }
    case 'HIDE_NOTIFICATION':
      return { text: null, timeoutId: null }
    default:
      return state
  }
}

// -----------------------
// actions creators
const MILLISECONDS = 1000

export const createNotification = (message, delay = 5) => {
  return async (dispatch) => {
    dispatch(showNotification(message))
    const timeoutId = setTimeout(() => {
      dispatch(hideNotification())
    }, delay * MILLISECONDS)
    dispatch(setTimeoutId(timeoutId))
  }
}

const showNotification = (message) => ({
  type: 'SHOW_NOTIFICATION',
  data: message,
})

const hideNotification = () => ({
  type: 'HIDE_NOTIFICATION',
})

const setTimeoutId = (timeoutID) => ({
  type: 'SET_TIMEOUT_ID',
  data: timeoutID,
})

// -----------------------
export default messageReducer

const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}
const INC = 1
const counterReducer = (state = initialState, action) => {
  console.log(action)
  console.log(state)
  switch (action.type) {
    case 'GOOD':
      // setInitial((prev) => {...prev, good: prev.good + 1})
      return { ...state, good: Number(state.good) + INC }
    case 'OK':
      return { ...state, ok: Number(state.ok) + INC }
    case 'BAD':
      return { ...state, bad: Number(state.bad) + INC }
    case 'ZERO':
      return initialState
    default:
      return state
  }
}

export default counterReducer

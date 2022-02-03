import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from '../reducers/anecdoteReducer'
import messageReducer from '../reducers/messageReducer'
import filterAnecdotesReducer from '../reducers/filterAnecdoteReducer'
const reducer = combineReducers({ anecdotes: anecdoteReducer, message: messageReducer, filter: filterAnecdotesReducer })
const store = createStore(reducer, composeWithDevTools())

export default store

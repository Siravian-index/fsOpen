// refactored
// import { useDispatch } from 'react-redux'
// -------------------

import { connect } from 'react-redux'

import { filterAnecdotes } from '../reducers/filterAnecdoteReducer'

// NOTE
// went back in time to use connect instead of the modern way just to learn it.
const AnecdoteFilter = (props) => {
  // refactored
  // const dispatch = useDispatch()
  const handleTyping = (e) => {
    // refactored
    // dispatch(filterAnecdotes(e.target.value))
    props.filterAnecdotes(e.target.value)
  }

  const style = {
    marginBottom: 10,
  }
  return (
    <div style={style}>
      <span>
        filter
        <input onChange={(e) => handleTyping(e)} />
      </span>
    </div>
  )
}

// this is pass to connect to map the dispatch to the props on the main component
const mapDispatchToProps = {
  filterAnecdotes,
}

const ConnectedAnecdoteFilter = connect(null, mapDispatchToProps)(AnecdoteFilter)
export default ConnectedAnecdoteFilter

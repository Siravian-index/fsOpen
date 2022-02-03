import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterAnecdoteReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()
  const handleTyping = (e) => {
    dispatch(filterAnecdotes(e.target.value))
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
export default AnecdoteFilter

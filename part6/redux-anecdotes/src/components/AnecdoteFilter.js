import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('')
  const handleTyping = (e) => {
    setFilter(e.target.value)
    dispatch(filterAnecdotes(filter))
  }
  return (
    <>
      <span>
        filter
        <input value={filter} onChange={(e) => handleTyping(e)} />
      </span>
    </>
  )
}
export default AnecdoteFilter

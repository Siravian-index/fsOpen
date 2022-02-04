// axios get and post
import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  try {
    const res = await axios.get(baseURL)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export const postAnecdote = async (str) => {
  try {
    const anecdote = { str }
    const res = await axios.post(baseURL, anecdote)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

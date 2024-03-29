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

export const postAnecdote = async (content) => {
  try {
    const anecdote = { content, votes: 0 }
    const res = await axios.post(baseURL, anecdote)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export const getAnecdote = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/${id}`)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export const putAnecdote = async (obj) => {
  try {
    const res = await axios.put(`${baseURL}/${obj.id}`, obj)
    // should return updated obj, right?
    return res.data
  } catch (err) {
    console.log(err)
  }
}

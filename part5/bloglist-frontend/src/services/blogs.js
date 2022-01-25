import axios from 'axios'
const baseUrl = '/api/blogs'

export const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

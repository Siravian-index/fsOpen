import axios from 'axios'
const baseUrl = '/api/blogs'

export const getAll = async () => {
  try {
    const res = await axios.get(baseUrl)
    if (res.status === 200) {
      return res.data
    }
  } catch (err) {
    console.log(err)
  }
}

export const createOne = async (blog, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const res = await axios.post(baseUrl, blog, config)
    if (res.status === 201) {
      return res.data
    }
  } catch (err) {
    console.log(err)
  }
}

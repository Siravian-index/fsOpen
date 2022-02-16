import axios from 'axios'
const baseUrl = '/api/users'

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

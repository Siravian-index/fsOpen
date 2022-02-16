import axios from 'axios'
const baseUrl = '/api/login'

export const login = async (credentials) => {
  try {
    const res = await axios.post(baseUrl, credentials)
    if (res.status === 200) {
      return res.data
    }
  } catch (err) {
    console.log(err)
  }
}

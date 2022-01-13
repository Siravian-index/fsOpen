import axios from 'axios'
import { baseUrl } from '.'

const getContacts = async () => {
  try {
    const res = await axios.get(baseUrl)
    return res.data
  } catch (err) {
    console.log(err)
    return []
  }
}

export default getContacts

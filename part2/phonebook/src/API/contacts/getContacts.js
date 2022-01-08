import axios from 'axios'

const getContacts = async () => {
  try {
    const res = await axios.get('http://localhost:3001/persons')
    return res.data
  } catch (err) {
    console.log(err)
    return []
  }
}

export default getContacts

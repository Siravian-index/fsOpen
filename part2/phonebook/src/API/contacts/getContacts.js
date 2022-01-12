import axios from 'axios'

const getContacts = async () => {
  const l = 'api/persons/'
  try {
    const res = await axios.get(`${process.env.REACT_APP_ENDPOINT}${l}`)
    return res.data
  } catch (err) {
    console.log(err)
    return []
  }
}

export default getContacts

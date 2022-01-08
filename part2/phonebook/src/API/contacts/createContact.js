import axios from 'axios'

const createContact = async (contact) => {
  const errorMessage = 'Could not perform the operation'
  const successMessage = 'Contact created successfully'
  try {
    const res = await axios.post('http://localhost:3001/persons', contact)
    return { msg: successMessage, data: res.data }
  } catch (err) {
    console.log(err)
    return { msg: errorMessage }
  }
}

export default createContact

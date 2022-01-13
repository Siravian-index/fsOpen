import axios from 'axios'
import { baseUrl } from '.'

const createContact = async (contact) => {
  const errorMessage = 'Could not perform the operation'
  const successMessage = 'Contact created successfully'
  try {
    const res = await axios.post(baseUrl, contact)
    return { msg: successMessage, data: res.data }
  } catch (err) {
    console.log(err)
    return { msg: errorMessage }
  }
}

export default createContact

import axios from 'axios'
import { baseUrl } from '.'

const updateContacts = async (id, contact) => {
  // const errorMessage = 'Could not perform the operation'
  const successMessage = 'Contact updated successfully'
  try {
    const res = await axios.put(`${baseUrl}/${id}`, contact)
    return { msg: successMessage, data: res.data }
  } catch (err) {
    console.log(err)
    return { msg: `Information of ${contact.name} has already been removed from the server` }
  }
}

export default updateContacts

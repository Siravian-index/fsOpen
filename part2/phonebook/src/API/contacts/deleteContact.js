import axios from 'axios'
import { baseUrl } from '.'

const deleteContact = async (id) => {
  const errorMessage = 'Could not perform the operation'
  const successMessage = 'Contact deleted successfully'
  try {
    const res = await axios.delete(`${baseUrl}/${id}`)
    return { msg: successMessage, data: res.status }
  } catch (err) {
    console.log(err)
    return { msg: errorMessage }
  }
}

export default deleteContact

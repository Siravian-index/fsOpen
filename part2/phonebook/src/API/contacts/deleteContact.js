import axios from 'axios'

const deleteContact = async (id) => {
  const errorMessage = 'Could not perform the operation'
  const successMessage = 'Contact deleted successfully'
  try {
    const res = await axios.delete(`http://localhost:3001/persons/${id}`)
    console.log(res)
    return { msg: successMessage, data: res.status }
  } catch (err) {
    console.log(err)
    return { msg: errorMessage }
  }
}

export default deleteContact

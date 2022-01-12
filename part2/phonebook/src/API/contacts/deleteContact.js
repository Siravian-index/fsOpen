import axios from 'axios'

const deleteContact = async (id) => {
  const errorMessage = 'Could not perform the operation'
  const successMessage = 'Contact deleted successfully'
  const l = 'api/persons/'
  try {
    const res = await axios.delete(`${process.env.REACT_APP_ENDPOINT}${l}${id}`)
    return { msg: successMessage, data: res.status }
  } catch (err) {
    console.log(err)
    return { msg: errorMessage }
  }
}

export default deleteContact

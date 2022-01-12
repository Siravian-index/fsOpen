import axios from 'axios'

const createContact = async (contact) => {
  const errorMessage = 'Could not perform the operation'
  const successMessage = 'Contact created successfully'
  const l = 'api/persons/'
  try {
    const res = await axios.post(`${process.env.REACT_APP_ENDPOINT}${l}`, contact)
    return { msg: successMessage, data: res.data }
  } catch (err) {
    console.log(err)
    return { msg: errorMessage }
  }
}

export default createContact

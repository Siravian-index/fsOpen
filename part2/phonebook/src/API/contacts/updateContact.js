import axios from 'axios'

const updateContacts = async (id, contact) => {
  const errorMessage = 'Could not perform the operation'
  const successMessage = 'Contact updated successfully'
  try {
    const res = await axios.put(`http://localhost:3001/persons/${id}`, contact)
    return { msg: successMessage, data: res.data }
  } catch (err) {
    console.log(err)
    return { msg: errorMessage }
  }
}

export default updateContacts

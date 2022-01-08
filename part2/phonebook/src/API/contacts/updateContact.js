import axios from 'axios'

const deleteContact = async (id) => {
  const errorMessage = 'Could not perform the operation'
  const successMessage = 'Contact updated successfully'
  try {
    const res = await axios.put(`http://localhost:3001/persons/${id}`)
    console.log(res.data)
    return { data: successMessage }
  } catch (err) {
    console.log(err)
    return { data: errorMessage }
  }
}

export default deleteContact

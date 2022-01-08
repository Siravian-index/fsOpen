import axios from 'axios'

const createContact = async (contact) => {
  const errorMessage = 'Could not perform the operation'
  const successMessage = 'Contact created successfully'
  try {
    const res = await axios.post('http://localhost:3001/persons', {
      data: contact,
    })
    console.log(res)
    return { data: successMessage }
  } catch (err) {
    console.log(err)
    return { data: errorMessage }
  }
}

export default createContact

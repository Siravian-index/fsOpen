import createContact from './createContact'
import deleteContact from './deleteContact'
import getContacts from './getContacts'
import updateContacts from './updateContact'

// baseUrl
export const baseUrl = '/api/persons'

// contact methods
const C = { createContact, deleteContact, getContacts, updateContacts }

export default C

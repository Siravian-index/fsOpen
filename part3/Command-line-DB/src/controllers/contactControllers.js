import Contact from '../model/contactModel.js'
import mongoose from 'mongoose'

export const generateNewContact = async (array) => {
  const [password, name, number] = array
  const contact = new Contact({
    name,
    number,
  })
  await contact.save()
  console.log(`added ${contact.name} to phonebook`)
  mongoose.connection.close()
}

export const logContactList = async () => {
  const contacts = await Contact.find({})
  console.log(`phonebook:`)
  for (let contact of contacts) {
    console.log(contact.name, contact.number)
  }
  mongoose.connection.close()
}

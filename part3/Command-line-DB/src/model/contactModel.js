import mongoose from 'mongoose'
const { Schema, model } = mongoose

const contactSchema = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
})

const Contact = model('contact', contactSchema)
export default Contact

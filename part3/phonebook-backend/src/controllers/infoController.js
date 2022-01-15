import Contact from '../models/personsModels.js'

export const getInfo = async (req, res) => {
  const l = await Contact.find({})
  const d = new Date()
  res.send(`
    <p>Phonebook has info for ${l.length} people</p>
    <p>${d}</p>
  `)
}

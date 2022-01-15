import Contact from '../models/personsModels.js'

// GET all
const getPersons = async (req, res, next) => {
  try {
    const persons = await Contact.find({})
    res.json(persons)
  } catch (err) {
    console.log(err)
    next(err)
  }
}

// GET one
const getPerson = async (req, res, next) => {
  const { id } = req.params
  try {
    const contact = await Contact.findById(id)
    if (contact) {
      res.json(contact)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    next(err)
  }
}

// DELETE one
const deletePerson = async (req, res) => {
  const { id } = req.params
  try {
    await Contact.findByIdAndDelete(id)
    res.status(204).end()
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

// POST one
const createPerson = async (req, res, next) => {
  const { name, number } = req.body
  try {
    const duplicate = await Contact.findOne({ name })
    if (duplicate) {
      return res.status(400).json({ error: 'contact already exist' })
    }
    if (!name) {
      return res.status(400).json({ error: 'contacts must contain a name' })
    }
    if (!number) {
      return res.status(400).json({ error: 'contacts must contain a number' })
    }
    const newContact = new Contact({ name, number })
    await newContact.save()
    return res.json(newContact)
  } catch (err) {
    next(err)
  }
}

// PUT
const updatePerson = async (req, res, next) => {
  const { id } = req.params
  const { name, number } = req.body
  try {
    const personUpdated = await Contact.findByIdAndUpdate(id, { name, number }, { new: true })
    res.json(personUpdated)
  } catch (err) {
    next(err)
  }
}

export { getPerson, getPersons, deletePerson, createPerson, updatePerson }

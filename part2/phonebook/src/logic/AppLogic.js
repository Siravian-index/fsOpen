const addContact = (e, arr, setArr, name, setName, number, setNumber) => {
  e.preventDefault()
  const exists = arr.some((p) => p.name === name)
  if (name && number) {
    if (!exists) {
      const newContact = { name, number }
      setArr((prev) => [...prev, newContact])
      setName('')
      setNumber('')
    } else {
      alert(`${name} is already added to phonebook`)
    }
  } else {
    alert(`name and number must be filled`)
  }
}

export { addContact }

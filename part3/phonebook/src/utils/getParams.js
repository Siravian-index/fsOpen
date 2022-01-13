export const getParams = () => {
  const args = process.argv
  const [node, file, password, name, number] = args
  if (password && name && number) {
    return [password, name, number]
  } else if (password) {
    return [password]
  } else {
    throw new Error('Args must be pass in this order: password, (contactName), (contactNumber)')
  }
}

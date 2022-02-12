export const LOCAL_STORAGE_USER_KEY = 'currentUser'

export const saveToLocalStorage = (key, value) => {
  const valueString = JSON.stringify(value)
  localStorage.setItem(key, valueString)
  console.log('saved to localStorage')
}

export const parseFromLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  if (value) {
    const parsedObj = JSON.parse(value)
    console.log('parsed from localStorage')
    return parsedObj
  }
  return null
}

export const deleteFromLocalStorage = (key) => {
  localStorage.removeItem(key)
}

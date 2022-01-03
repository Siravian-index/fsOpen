const getSum = (obj) => {
  const numbers = Object.values(obj)
  return numbers.reduce((init, num) => init + num, 0)
}

export default getSum

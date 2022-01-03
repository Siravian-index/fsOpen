import getSum from './getSum'
const getAvg = (obj) => {
  let total = getSum(obj)
  const { good, bad } = obj
  return (good - bad) / total
}

export default getAvg

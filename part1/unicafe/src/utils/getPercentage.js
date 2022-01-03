import getSum from './getSum'

const getPercentage = (stats) => {
  const total = getSum(stats)
  const hundred = 100
  return `${(stats.good / total) * hundred}%`
}

export default getPercentage

import getPercentage from '../utils/getPercentage'
import getSum from '../utils/getSum'
import getAvg from '../utils/getAvg'
import StatisticLine from './StatisticLine'
const Statistics = ({ stats }) => {
  const { good, neutral, bad } = stats
  return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={good} />
        <StatisticLine text={'neutral'} value={neutral} />
        <StatisticLine text={'bad'} value={bad} />
        <StatisticLine text={'all'} value={getSum(stats)} />
        <StatisticLine text={'average'} value={getAvg(stats)} />
        <StatisticLine text={'positive'} value={getPercentage(stats)} />
      </tbody>
    </table>
  )
}

export default Statistics

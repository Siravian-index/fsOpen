import Title from './Title'

const Statistics = ({ stats }) => {
  const title = 'statistics'
  const { good, neutral, bad } = stats

  return (
    <>
      <div>
        <Title title={title} />
        <ul>
          <li>good {good}</li>
          <li>neutral {neutral}</li>
          <li>bad {bad}</li>
        </ul>
      </div>
    </>
  )
}

export default Statistics

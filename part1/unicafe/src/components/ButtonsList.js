import Button from './Button'
import Title from './Title'
const ButtonsList = ({ callback, setStates }) => {
  const title = 'give feedback'
  const { setGood, setNeutral, setBad } = setStates
  return (
    <>
      <Title title={title} />
      <Button callback={callback} setState={setGood} text={'good'} />
      <Button callback={callback} setState={setNeutral} text={'neutral'} />
      <Button callback={callback} setState={setBad} text={'bad'} />
    </>
  )
}

export default ButtonsList

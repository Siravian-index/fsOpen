import Button from './Button'
const ButtonsList = ({ callback, setStates }) => {
  const { setGood, setNeutral, setBad } = setStates
  return (
    <>
      <Button callback={callback} setState={setGood} text={'good'} />
      <Button callback={callback} setState={setNeutral} text={'neutral'} />
      <Button callback={callback} setState={setBad} text={'bad'} />
    </>
  )
}

export default ButtonsList

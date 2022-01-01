const Total = ({ content }) => {
  return (
    <>
      <div>
        <p> {content.parts.reduce((init, obj) => init + obj.exercises, 0)} </p>
      </div>
    </>
  )
}

export default Total

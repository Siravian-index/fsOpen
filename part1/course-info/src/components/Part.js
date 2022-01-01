const Part = ({ content }) => {
  return (
    <>
      <div>
        {content.parts.map((obj) => (
          <p key={obj.name}>
            {obj.name} - {obj.exercises}
          </p>
        ))}
      </div>
    </>
  )
}

export default Part

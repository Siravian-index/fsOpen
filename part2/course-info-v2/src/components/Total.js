const Total = ({ course }) => {
  return (
    <>
      <div>
        <b> total of {course.parts.reduce((init, obj) => init + obj.exercises, 0)} exercises </b>
      </div>
    </>
  )
}

export default Total

import Total from './Total'

const Part = ({ course }) => {
  console.log(course)
  return (
    <>
      <h2>{course.name}</h2>
      {course.parts.map((e) => (
        <p key={e.id}>
          {e.name} {e.exercises}
        </p>
      ))}
      <Total course={course} />
    </>
  )
}

export default Part

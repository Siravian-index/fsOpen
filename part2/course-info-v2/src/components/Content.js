import Part from './Part'
const Content = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <Part part={course} key={course.id} />
      ))}
    </>
  )
}

export default Content

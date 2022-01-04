import Part from './Part'
const Content = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <Part course={course} key={course.id} />
      ))}
    </>
  )
}

export default Content

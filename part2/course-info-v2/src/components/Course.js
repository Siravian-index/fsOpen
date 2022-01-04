import Header from './Header'
import Content from './Content'

const Course = ({ courses }) => {
  return (
    <>
      <Header text={'Web development curriculum'} />
      <Content courses={courses} />
    </>
  )
}

export default Course

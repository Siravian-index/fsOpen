//imports
import { useHistory } from 'react-router'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const history = useHistory()
  const contentField = useField('text')
  const authorField = useField('text')
  const infoField = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = contentField.value
    const author = authorField.value
    const info = infoField.value
    props.addNew({ content, author, info, votes: 0 })
    props.setNotification(content)
    history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...contentField} />
        </div>
        <div>
          author
          <input name='author' {...authorField} />
        </div>
        <div>
          url for more info
          <input name='info' {...infoField} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateNew

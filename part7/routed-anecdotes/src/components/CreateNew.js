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
    const content = contentField.inputProps.value
    const author = authorField.inputProps.value
    const info = infoField.inputProps.value
    props.addNew({ content, author, info, votes: 0 })
    props.setNotification(content)
    history.push('/')
  }

  const handleReset = () => {
    contentField.resetValue()
    authorField.resetValue()
    infoField.resetValue()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...contentField.inputProps} />
        </div>
        <div>
          author
          <input name='author' {...authorField.inputProps} />
        </div>
        <div>
          url for more info
          <input name='info' {...infoField.inputProps} />
        </div>
        <button type='submit'>create</button>
        <button onClick={handleReset} type='reset'>
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateNew

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlog from './CreateBlog'

test.only('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()
  const user = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhdmluY2hpIiwiaWQiOiI2MWVjODA0NGQxNGNkYmViZWUxODMzYWMiLCJpYXQiOjE2NDMzMzUzODEsImV4cCI6MTY0MzMzODk4MX0.AOVqVyIhdcFTNdH6BqxOOJhDeTlv-DtVYvCnSlfgKmI',
  }

  const component = render(<CreateBlog createBlog={addBlog} user={user} />)

  const openForm = component.getByText('create a new blog')
  fireEvent.click(openForm)

  const inputTitle = component.getByPlaceholderText('title')
  const inputAuthor = component.getByPlaceholderText('author')
  const inputUrl = component.getByPlaceholderText('url')
  const form = component.container.querySelector('form')
  fireEvent.change(inputTitle, {
    target: { value: 'Blog Title' },
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'Author' },
  })
  fireEvent.change(inputUrl, {
    target: { value: 'tests.com' },
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Blog Title')
  expect(addBlog.mock.calls[0][0].author).toBe('Author')
  expect(addBlog.mock.calls[0][0].url).toBe('http://blog-title.com')
})

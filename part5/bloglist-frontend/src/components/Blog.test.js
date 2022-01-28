import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Exercises 5.13-5.16', () => {
  const blog = {
    author: 'david',
    title: 'testing',
    url: 'https://testing-library.com/',
    likes: 0,
  }
  const user = {
    username: 'davinchi',
    name: 'david',
  }
  const setBlogs = jest.fn()
  let component
  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} setBlogs={setBlogs} />)
  })
  test('checks that only title and author are display ', () => {
    expect(component.container).not.toHaveTextContent('https://testing-library.com/')
    expect(component.container).not.toHaveTextContent('likes 12')
    expect(component.container).toHaveTextContent('david')
    expect(component.container).toHaveTextContent('testing')
  })

  test('checks that url and number of likes are shown after the show button is clicked', () => {
    const showButton = component.getByText('view')
    fireEvent.click(showButton)
    const divExtraInfo = component.container.querySelector('.extra-content')
    expect(divExtraInfo).toHaveTextContent('https://testing-library.com/')
    expect(divExtraInfo).toHaveTextContent('likes')
  })

  // test('checks the callback function is invoked twice after giving two likes', async () => {
  // const showButton = component.getByText('view')
  // fireEvent.click(showButton)
  // const likeButton = component.getByText('like')
  // fireEvent.click(likeButton)
  // fireEvent.click(likeButton)
  // expect(setBlogs.mock.calls).toHaveLength(2)
  // })
})

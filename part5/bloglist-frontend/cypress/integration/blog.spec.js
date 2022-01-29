describe('blog app login', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  it('registered user can login', function () {
    const username = 'davinchi'
    const password = 'testing123'
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
    cy.contains(`${username} logged in`)
  })
})

describe('blog form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    const username = 'davinchi'
    const password = 'testing123'
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
  })
  it('user can create a new blog', function () {
    const blog = { title: 'testing with cypress', author: 'cypress', url: 'cypress.com' }
    // expand the form
    cy.get('#show-form-button').click()
    // type on the form
    cy.get('#title').type(blog.title)
    cy.get('#author').type(blog.author)
    cy.get('#url').type(blog.url)
    // click submit
    cy.get('#submit-blog').click()
    // check the new blog is on the page
    cy.contains(blog.title)
    cy.contains(blog.author)
  })
})

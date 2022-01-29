describe('blog app', function () {
  beforeEach(function () {
    cy.clearTestingDb()
    cy.createUser()
  })

  describe('login component', function () {
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
    it('unregistered user cannot login', function () {
      const username = 'invalid'
      const password = '12345678a'
      cy.get('#username').type(username)
      cy.get('#password').type(password)
      cy.get('#login-button').click()
      // checks error message
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'davinchi logged in')
    })
  })

  describe('when logged in ', () => {
    beforeEach(() => {
      // cy.login({ username: 'davinchi', password: 'testing123' })
      cy.login('davinchi', 'testing123')
    })
    describe('user creates a blog', function () {
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
  })
})

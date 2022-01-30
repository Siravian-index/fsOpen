describe('blog app', function () {
  beforeEach(function () {
    cy.clearTestingDb()
    cy.createUser('david', 'davinchi', 'testing123')
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

    describe('user actions', () => {
      beforeEach(() => {
        const blog = {
          title: 'like or delete me',
          author: 'tester',
          url: 'https://docs.cypress.io/api/cypress-api/custom-commands',
        }
        cy.createBlog(blog)
      })
      it('checks that users can like a blog', () => {
        cy.get('#show-more').click()
        cy.get('#like-button').as('likeBtn').click()
        cy.get('@likeBtn').parent().contains('likes 1')
      })

      it('owner can delete their blog posts', () => {
        cy.get('#show-more').click()
        cy.get('#delete-button').click()
        cy.get('html').should('not.contain', 'like or delete me')
      })

      it.only('non owner user cannot delete blog post', () => {
        cy.logout()
        cy.createUser('other', 'nonOwner', 'testing123')
        cy.login('nonOwner', 'testing123')
        cy.get('#show-more').click()
        cy.get('#delete-button').should('not.exist')
      })
    })

    describe('a blog exists', function () {
      beforeEach(function () {
        const blog = {
          title: 'commands are awesome',
          author: 'cypress',
          url: 'https://docs.cypress.io/api/cypress-api/custom-commands',
        }
        cy.createBlog(blog)
      })
      it('note is on the DOM', function () {
        cy.contains('commands are awesome')
      })
    })
  })
})

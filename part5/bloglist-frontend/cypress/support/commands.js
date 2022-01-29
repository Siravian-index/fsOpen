// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// beforeEach(function () {
//   // clears db
//   cy.request('POST', 'http://localhost:3001/api/testing/reset')
// const user = {
//   name: 'david',
//   username: 'davinchi',
//   password: 'testing123',
// }
// // creates new user
// cy.request('POST', 'http://localhost:3001/api/users/', user)
// cy.visit('http://localhost:3000')
// })

// clears testing db
Cypress.Commands.add('clearTestingDb', () => {
  cy.request('POST', 'http://localhost:3001/api/testing/reset')
})

// creates new user
Cypress.Commands.add('createUser', () => {
  const user = {
    name: 'david',
    username: 'davinchi',
    password: 'testing123',
  }
  cy.request('POST', 'http://localhost:3001/api/users/', user)
  cy.visit('http://localhost:3000')
})

// log user in
Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('currentUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

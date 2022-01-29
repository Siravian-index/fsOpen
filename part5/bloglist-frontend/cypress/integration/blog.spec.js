describe('Note app', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
    cy.contains('create a new blog')
  })
})
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

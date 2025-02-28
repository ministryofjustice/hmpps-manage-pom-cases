import AuthRole from '../../server/data/authRole'
import IndexPage from '../pages'

describe('Primary navigation links', () => {
  beforeEach(() => {
    cy.task('reset')
  })

  context('User is an SPO', () => {
    beforeEach(() => {
      cy.task('stubSignIn', { roles: [AuthRole.SPO] })
      cy.signIn()
    })

    it('Shows the correct navigation links', () => {
      const page = new IndexPage()
      page.primaryNavigationLinks().should('deep.equal', ['POM cases', 'Allocations', 'Parole', 'Handover', 'Staff'])
    })
  })

  context('User is a POM', () => {
    beforeEach(() => {
      cy.task('stubSignIn', { roles: [AuthRole.POM] })
      cy.signIn()
    })

    it('Shows the correct navigation links', () => {
      const page = new IndexPage()
      page.primaryNavigationLinks().should('deep.equal', ['POM cases', 'Caseload', 'Handover'])
    })
  })
})

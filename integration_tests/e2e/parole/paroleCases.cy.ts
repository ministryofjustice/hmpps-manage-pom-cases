import AuthRole from '../../../server/data/authRole'
import Page from '../../pages/page'
import IndexPage from '../../pages'
import ParolePage from '../../pages/parolePage'
import paths from '../../../server/routes/paths'

context('Listing parole cases', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubListParoleCases')
  })

  it('Denies access to user without the SPO role', () => {
    cy.task('stubSignIn', { roles: [AuthRole.POM] })
    cy.signIn()

    cy.visit(paths.parole.cases({ prisonCode: 'LEI' }), { failOnStatusCode: false })
    cy.url().should('contain', '/access-denied')
  })

  it('Lists cases approaching parole', () => {
    cy.task('stubSignIn', { roles: [AuthRole.SPO] })
    cy.signIn()

    const page = new IndexPage()
    page.navigationLink('Parole').click()

    Page.verifyOnPage(ParolePage)
    const parolePage = new ParolePage()
    parolePage.offenderNames().should('contain', 'John Doe\nA1234AA')
    parolePage.pomNames().should('contain', 'MOIC Pom')
    parolePage.pomRoles().should('contain', 'Supporting')
    parolePage.paroleDates().should('contain', 'TED:\n01 Jan 2026')
  })
})

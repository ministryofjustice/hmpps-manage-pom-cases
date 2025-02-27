import IndexPage from '../pages/index'
import Page from '../pages/page'
import AuthRole from '../../server/data/authRole'

describe('Header', () => {
  context('when using frontend components fallback', () => {
    beforeEach(() => {
      cy.task('reset')
      cy.task('stubSignIn', { roles: [AuthRole.POM] })
    })

    it('User name visible in header', () => {
      cy.signIn()
      const indexPage = Page.verifyOnPage(IndexPage)
      indexPage.headerUserName().should('contain.text', 'J. Smith')
    })

    it('Phase banner is not visible in header', () => {
      cy.signIn()
      const indexPage = Page.verifyOnPage(IndexPage)
      indexPage.headerPhaseBanner().should('not.exist')
    })

    it('should not show change location link', () => {
      cy.signIn()
      const indexPage = Page.verifyOnPage(IndexPage)
      indexPage.changeLocationLink().should('not.exist')
    })
  })
})

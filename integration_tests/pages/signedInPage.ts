import Page from './page'

export type PageElement = Cypress.Chainable<JQuery>

export default abstract class SignedInPage extends Page {
  static verifyOnPage<T>(constructor: new () => T): T {
    return new constructor()
  }

  signOut = (): PageElement => cy.get('[data-qa=signOut]')

  manageDetails = (): PageElement => cy.get('[data-qa=manageDetails]')

  headerUserName = (): PageElement => cy.get('[data-qa=header-user-name]')

  headerPhaseBanner = (): PageElement => cy.get('.govuk-phase-banner')

  changeLocationLink = (): PageElement => cy.get('[data-qa="changeCaseLoad"]')

  primaryNavigation = (): PageElement => cy.get('nav.moj-primary-navigation a')

  primaryNavigationLinks = () =>
    this.primaryNavigation().then(cells => cells.map((index, cell) => cell.innerText).get())

  navigationLink = (text: string): PageElement =>
    this.primaryNavigation().then(cells => cells.filter((index, cell) => cell.innerText === text))
}

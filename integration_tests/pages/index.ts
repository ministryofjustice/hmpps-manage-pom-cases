import Page, { PageElement } from './page'

export default class IndexPage extends Page {
  constructor() {
    super('This site is under construction...')
  }

  headerUserName = (): PageElement => cy.get('[data-qa=header-user-name]')

  headerPhaseBanner = (): PageElement => cy.get('.govuk-phase-banner')

  changeLocationLink = (): PageElement => cy.get('[data-qa="changeCaseLoad"]')
}

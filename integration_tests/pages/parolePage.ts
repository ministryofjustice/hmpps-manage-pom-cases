import SignedInPage from './signedInPage'

export default class ParolePage extends SignedInPage {
  constructor() {
    super('Parole cases')
  }

  offenderNames = () =>
    cy.get('[data-qa=offender-name-column]').then(cells => cells.map((index, cell) => cell.innerText).get())

  pomNames = () => cy.get('[data-qa=pom-name-column]').then(cells => cells.map((index, cell) => cell.innerText).get())
}

import SignedInPage from './signedInPage'

export default class ParolePage extends SignedInPage {
  constructor() {
    super('Parole cases')
  }

  private getColumnText = (dataQa: string) =>
    cy.get(`[data-qa=${dataQa}]`).then(cells => cells.map((index, cell) => cell.innerText).get())

  offenderNames = () => this.getColumnText('offender-name-column')

  pomNames = () => this.getColumnText('pom-name-column')

  pomRoles = () => this.getColumnText('pom-role-column')

  paroleDates = () => this.getColumnText('next-parole-date-column')
}

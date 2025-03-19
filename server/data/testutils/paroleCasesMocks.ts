import { type UpcomingParoleCase } from '../../@types/shared'

const returnUpcomingParoleCase = ({
  caseId = 'A1234AA',
  firstName = 'John',
  lastName = 'Doe',
  pomId = 12345,
  pomFirstName = 'MOIC',
  pomLastName = 'POM',
  pomRole = 'Supporting',
  paroleDateValue = '2026-01-01',
  paroleDateType = 'TED',
} = {}): UpcomingParoleCase => ({
  caseId,
  firstName,
  lastName,
  pomId,
  pomFirstName,
  pomLastName,
  pomRole,
  paroleDateValue,
  paroleDateType,
})

export { returnUpcomingParoleCase }

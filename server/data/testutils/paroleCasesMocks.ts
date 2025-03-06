import { type UpcomingParoleCase } from '../../@types/shared'

const returnUpcomingParoleCase = ({
  caseId = 'A1234AA',
  caseName = 'John Doe',
  pomName = 'MOIC Pom',
  pomRole = 'Supporting',
  paroleDateValue = '2026-01-01',
  paroleDateType = 'TED',
} = {}): UpcomingParoleCase => ({
  caseId,
  caseName,
  pomName,
  pomRole,
  paroleDateValue,
  paroleDateType,
})

export { returnUpcomingParoleCase }

import type { SuperAgentRequest } from 'superagent'
import { stubFor } from './wiremock'
import { returnUpcomingParoleCase } from '../../server/data/testutils/paroleCasesMocks'

const apiPrefix = '/manage-pom-cases-api'
const paroleCasesUri = 'parole-cases/upcoming'
const headers = { 'Content-Type': 'application/json;charset=UTF-8' }

const paroleCase = returnUpcomingParoleCase()
const prisonCode = 'LEI'
const pomStaffId = 12345

export default {
  stubManagePomCasesPing: (httpStatus = 200): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `${apiPrefix}/health/ping`,
      },
      response: {
        status: httpStatus,
        headers,
        jsonBody: { status: httpStatus === 200 ? 'UP' : 'DOWN' },
      },
    }),

  stubUserHasPomRole: (httpStatus = 200, staffId = pomStaffId): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `${apiPrefix}/poms/[0-9]+/is-pom/${prisonCode}`,
      },
      response: {
        status: httpStatus,
        headers,
        jsonBody: staffId === pomStaffId,
      },
    }),

  stubListParoleCases: (httpStatus = 200): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `${apiPrefix}/${paroleCasesUri}/${prisonCode}`,
      },
      response: {
        status: httpStatus,
        headers,
        jsonBody: [paroleCase],
      },
    }),
}

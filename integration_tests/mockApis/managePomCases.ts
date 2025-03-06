import type { SuperAgentRequest } from 'superagent'
import { stubFor } from './wiremock'
import { returnUpcomingParoleCase } from '../../server/data/testutils/paroleCasesMocks'

const apiPrefix = '/manage-pom-cases-api'
const paroleCasesUri = 'parole-cases/upcoming'
const headers = { 'Content-Type': 'application/json;charset=UTF-8' }

const paroleCase = returnUpcomingParoleCase()

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

  stubListParoleCases: (httpStatus = 200): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `${apiPrefix}/${paroleCasesUri}`,
      },
      response: {
        status: httpStatus,
        headers,
        jsonBody: [paroleCase],
      },
    }),
}

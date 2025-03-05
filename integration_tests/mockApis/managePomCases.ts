import type { SuperAgentRequest } from 'superagent'
import { stubFor } from './wiremock'
import { returnParoleCase } from '../../server/data/testutils/paroleCasesMocks'

const apiPrefix = '/manage-pom-cases-api'
const paroleCasesUri = 'parole-cases'
const headers = { 'Content-Type': 'application/json;charset=UTF-8' }

const paroleCase = returnParoleCase()

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

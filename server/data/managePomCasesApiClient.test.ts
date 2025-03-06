import nock from 'nock'
import config from '../config'
import { mockRequest } from '../routes/testutils/requestTestUtils'
import { UpcomingParoleCase } from '../@types/shared'
import { returnUpcomingParoleCase } from './testutils/paroleCasesMocks'
import ManagePomCasesApiClient from './managePomCasesApiClient'

describe('managePomCasesApiClient', () => {
  let fakeApiClient: nock.Scope
  let managePomCasesApiClient: ManagePomCasesApiClient

  const req = mockRequest({})
  const paroleCase = returnUpcomingParoleCase()

  beforeEach(() => {
    fakeApiClient = nock(config.apis.managePomCasesApi.url)
    managePomCasesApiClient = new ManagePomCasesApiClient(req.middleware.clientToken)
  })

  afterEach(() => {
    jest.resetAllMocks()
    nock.cleanAll()
  })

  describe('upcomingParoleCases', () => {
    it('should return a list of upcoming parole cases', async () => {
      const response: { data: UpcomingParoleCase[] } = {
        data: [paroleCase],
      }

      fakeApiClient
        .get(`/parole-cases/upcoming`)
        .matchHeader('authorization', `Bearer ${req.middleware.clientToken}`)
        .reply(200, response)

      const output = await managePomCasesApiClient.upcomingParoleCases()
      expect(output).toEqual(response)
    })
  })
})

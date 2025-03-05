import nock from 'nock'
import config from '../config'
import { mockRequest } from '../routes/testutils/requestTestUtils'
import { ParoleCase } from '../@types/shared'
import { returnParoleCase } from './testutils/paroleCasesMocks'
import ManagePomCasesApiClient from './managePomCasesApiClient'

describe('managePomCasesApiClient', () => {
  let fakeApiClient: nock.Scope
  let managePomCasesApiClient: ManagePomCasesApiClient

  const req = mockRequest({})
  const paroleCase = returnParoleCase()

  beforeEach(() => {
    fakeApiClient = nock(config.apis.managePomCasesApi.url)
    managePomCasesApiClient = new ManagePomCasesApiClient(req.middleware.clientToken)
  })

  afterEach(() => {
    jest.resetAllMocks()
    nock.cleanAll()
  })

  describe('listCases', () => {
    it('should list cases approaching parole', async () => {
      const response: { data: ParoleCase[] } = {
        data: [paroleCase],
      }

      fakeApiClient
        .get(`/parole-cases`)
        .matchHeader('authorization', `Bearer ${req.middleware.clientToken}`)
        .reply(200, response)

      const output = await managePomCasesApiClient.listCases()
      expect(output).toEqual(response)
    })
  })
})

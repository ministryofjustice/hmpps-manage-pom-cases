import { HmppsAuthClient } from '..'
import ManagePomCasesApiClient from '../managePomCasesApiClient'

jest.mock('..')

const createMockHmppsAuthClient = () => new HmppsAuthClient(null) as jest.Mocked<HmppsAuthClient>

const createManagePomCasesApiClient = () => new ManagePomCasesApiClient(null) as jest.Mocked<ManagePomCasesApiClient>

export { createMockHmppsAuthClient, createManagePomCasesApiClient }

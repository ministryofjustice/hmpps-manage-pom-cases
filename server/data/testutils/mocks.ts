import { HmppsAuthClient } from '..'

jest.mock('..')

const createMockHmppsAuthClient = () => new HmppsAuthClient(null) as jest.Mocked<HmppsAuthClient>

export { createMockHmppsAuthClient }

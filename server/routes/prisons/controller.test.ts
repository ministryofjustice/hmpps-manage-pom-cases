import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes, pomUser } from '../testutils/appSetup'
import AuditService, { Page } from '../../services/auditService'
import paths from '../paths'

jest.mock('../../services/auditService')

const auditService = new AuditService(null) as jest.Mocked<AuditService>

const rootPath = paths.root({})
const dashboardPath = paths.prisons.dashboard({ prisonCode: 'LEI' })

let app: Express

beforeEach(() => {
  app = appWithAllRoutes({
    services: {
      auditService,
    },
    userSupplier: () => pomUser,
  })
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('Dashboard', () => {
  it('should redirect to the dashboard page for the prison', () => {
    return request(app).get(rootPath).expect(302).expect('Location', dashboardPath)
  })

  it('should render the dashboard page', () => {
    auditService.logPageView.mockResolvedValue(null)

    return request(app)
      .get(dashboardPath)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('POM cases')
        expect(auditService.logPageView).toHaveBeenCalledWith(Page.HOME_PAGE, {
          who: pomUser.username,
          correlationId: expect.any(String),
        })
      })
  })
})

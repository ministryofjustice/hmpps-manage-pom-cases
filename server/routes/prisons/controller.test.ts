import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes, spoUser } from '../testutils/appSetup'
import AuditService, { Page } from '../../services/auditService'
import paths from '../paths'

jest.mock('../../services/auditService')

const auditService = new AuditService(null) as jest.Mocked<AuditService>

let app: Express

beforeEach(() => {
  app = appWithAllRoutes({
    services: {
      auditService,
    },
    userSupplier: () => spoUser,
  })
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('Dashboard', () => {
  const rootPath = paths.root({})
  const dashboardPath = paths.prisons.dashboard({ prisonCode: 'LEI' })

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
        expect(auditService.logPageView).toHaveBeenCalledWith(Page.PRISON_DASHBOARD, {
          who: spoUser.username,
          correlationId: expect.any(String),
        })
      })
  })
})

describe('Parole', () => {
  it('should render the parole cases page', () => {
    auditService.logPageView.mockResolvedValue(null)

    const parolePath = paths.prisons.parole({ prisonCode: 'LEI' })

    return request(app)
      .get(parolePath)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Parole cases')
        expect(auditService.logPageView).toHaveBeenCalledWith(Page.PAROLE_CASES_PAGE, {
          who: spoUser.username,
          correlationId: expect.any(String),
        })
      })
  })
})

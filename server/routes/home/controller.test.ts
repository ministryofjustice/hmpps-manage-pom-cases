import { Services } from '../../services'
import { index } from './controller'
import AuthRole from '../../data/authRole'
import { testRequestHandler } from '../testutils/requestHandler'
import AuditService from '../../services/auditService'

jest.mock('../../services/auditService')

const auditService = new AuditService(null) as jest.Mocked<AuditService>
const services = { auditService } as unknown as Services

beforeEach(() => {
  auditService.logPageView.mockResolvedValue(null)
})

describe('index', () => {
  it('configures view context for a POM role', async () => {
    const [req, res, next] = testRequestHandler({ user: { userRoles: [AuthRole.POM] } })
    const viewContext = {
      userIsAdmin: false,
      userIsSpo: false,
      userIsPom: true,
    }

    await index(services)(req, res, next)
    expect(res.render).toHaveBeenCalledWith('pages/home/index', viewContext)
  })

  it('configures view context for an SPO role', async () => {
    const [req, res, next] = testRequestHandler({ user: { userRoles: [AuthRole.SPO] } })
    const viewContext = {
      userIsAdmin: false,
      userIsSpo: true,
      userIsPom: false,
    }

    await index(services)(req, res, next)
    expect(res.render).toHaveBeenCalledWith('pages/home/index', viewContext)
  })

  it('configures view context for an ADMIN role', async () => {
    const [req, res, next] = testRequestHandler({ user: { userRoles: [AuthRole.ADMIN] } })
    const viewContext = {
      userIsAdmin: true,
      userIsSpo: false,
      userIsPom: false,
    }

    await index(services)(req, res, next)
    expect(res.render).toHaveBeenCalledWith('pages/home/index', viewContext)
  })

  it('configures view context for an unrecognised role', async () => {
    const [req, res, next] = testRequestHandler({ user: { userRoles: ['FOOBAR'] } })
    const viewContext = {
      userIsAdmin: false,
      userIsSpo: false,
      userIsPom: false,
    }

    await index(services)(req, res, next)
    expect(res.render).toHaveBeenCalledWith('pages/home/index', viewContext)
  })
})

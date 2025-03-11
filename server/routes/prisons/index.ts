import { RequestHandler, Router } from 'express'
import { Path } from 'static-path'
import { Services } from '../../services'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import roleCheckMiddleware from '../../middleware/roleCheckMiddleware'
import AuthRole from '../../data/authRole'
import PrisonRoutes from './controller'
import paths from '../paths'

export default function Index({ auditService, paroleService }: Services): Router {
  const router = Router()

  const get = <T extends string>(routerPath: Path<T>, handler: RequestHandler, roles: AuthRole[]) =>
    router.get(routerPath.pattern, roleCheckMiddleware(roles), asyncMiddleware(handler))

  const prisonRoutes = new PrisonRoutes(auditService, paroleService)

  get(paths.pomCases.dashboard, prisonRoutes.dashboard, [AuthRole.POM, AuthRole.SPO])
  get(paths.parole.cases, prisonRoutes.paroleCases, [AuthRole.SPO])

  return router
}

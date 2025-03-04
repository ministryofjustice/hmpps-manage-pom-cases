import { RequestHandler, Router } from 'express'
import { Path } from 'static-path'
import { Services } from '../../services'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import roleCheckMiddleware from '../../middleware/roleCheckMiddleware'
import AuthRole from '../../data/authRole'
import PrisonRoutes from './controller'
import paths from '../paths'

export default function Index({ auditService }: Services): Router {
  const router = Router()

  const get = <T extends string>(routerPath: Path<T>, handler: RequestHandler) =>
    router.get(routerPath.pattern, roleCheckMiddleware([AuthRole.POM, AuthRole.SPO]), asyncMiddleware(handler))

  const prisonRoutes = new PrisonRoutes(auditService)
  get(paths.prisons.dashboard, prisonRoutes.dashboard)

  return router
}

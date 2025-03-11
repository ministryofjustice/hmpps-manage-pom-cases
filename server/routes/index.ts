import { Router, Request, Response } from 'express'
import type { Services } from '../services'
import prisonRoutes from './prisons'
import paths from './paths'

export default function routes(services: Services): Router {
  const router = Router()

  router.use(prisonRoutes(services))

  router.get(paths.root({}), (_req: Request, res: Response) =>
    res.redirect(
      paths.pomCases.dashboard({
        // @ts-expect-error - not sure why the property is not found!
        prisonCode: res.locals.user.activeCaseLoadId,
      }),
    ),
  )

  return router
}

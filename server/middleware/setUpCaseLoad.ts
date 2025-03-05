import { Router } from 'express'

export default function setUpCaseLoad(): Router {
  const router = Router()

  // caseload details obtained from dps frontend components shared data
  router.use((req, res, next) => {
    if (res.locals.user.authSource !== 'nomis') {
      return next()
    }

    const { activeCaseLoad, caseLoads } = res.locals.feComponents?.sharedData || {}
    const activeCaseLoadId = activeCaseLoad?.caseLoadId

    res.locals.user = {
      ...res.locals.user,
      activeCaseLoadId,
      caseLoads,
    }

    return next()
  })

  return router
}

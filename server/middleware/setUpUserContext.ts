import { Router } from 'express'
import { UserContext } from '../interfaces/userContext'
import { userIsAdmin, userIsPom, userIsSpo } from '../utils/authUtils'

export default function setUpUserContext(): Router {
  const router = Router()

  router.use((req, res, next) => {
    res.locals.userContext = {
      isAdmin: userIsAdmin(req.user),
      isSpo: userIsSpo(req.user),
      isPom: userIsPom(req.user),
    } as UserContext

    next()
  })

  return router
}

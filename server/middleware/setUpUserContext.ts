import { RequestHandler } from 'express'
import { PrisonUser } from '../interfaces/hmppsUser'
import { UserContext } from '../interfaces/userContext'
import StaffService from '../services/staffService'
import AuthRole from '../data/authRole'
import logger from '../../logger'

export default function setUpUserContext(staffService: StaffService): RequestHandler {
  return async (req, res, next) => {
    try {
      const { clientToken } = req.middleware
      const prisonUser = res.locals.user as PrisonUser

      const userIsPomInCurrentPrison = await staffService.userHasPomRole(clientToken, prisonUser)

      res.locals.userContext = {
        isAdmin: req.user.userRoles.includes(AuthRole.ADMIN),
        isSpo: req.user.userRoles.includes(AuthRole.SPO),
        isPom: req.user.userRoles.includes(AuthRole.POM) && userIsPomInCurrentPrison,
      } as UserContext

      return next()
    } catch (error) {
      logger.error(error, `Failed to setup user context for: ${req.user && req.user.username}`)
      return res.redirect('/access-denied')
    }
  }
}

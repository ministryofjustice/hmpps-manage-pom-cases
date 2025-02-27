import { RequestHandlerWithServices } from '../../services'
import { hasRole } from '../../utils/utils'
import AuthRole from '../../data/authRole'
import { Page } from '../../services/auditService'

export const index: RequestHandlerWithServices =
  ({ auditService }) =>
  async (req, res, next) => {
    const viewContext = {
      userIsAdmin: hasRole(req.user, AuthRole.ADMIN),
      userIsPom: hasRole(req.user, AuthRole.POM),
      userIsSpo: hasRole(req.user, AuthRole.SPO),
    }

    await auditService.logPageView(Page.HOME_PAGE, { who: res.locals.user.username, correlationId: req.id })

    res.render('pages/home/index', viewContext)
  }

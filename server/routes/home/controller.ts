import { RequestHandlerWithServices } from '../../services'
import { Page } from '../../services/auditService'

export const index: RequestHandlerWithServices =
  ({ auditService }) =>
  async (req, res, next) => {
    await auditService.logPageView(Page.HOME_PAGE, { who: res.locals.user.username, correlationId: req.id })

    res.render('pages/home/index')
  }

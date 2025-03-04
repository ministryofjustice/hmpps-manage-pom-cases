import { Request, Response } from 'express'
import AuditService, { Page } from '../../services/auditService'

export default class PrisonRoutes {
  constructor(private readonly auditService: AuditService) {}

  dashboard = async (req: Request, res: Response): Promise<void> => {
    await this.auditService.logPageView(Page.HOME_PAGE, { who: res.locals.user.username, correlationId: req.id })

    res.render('pages/prisons/dashboard')
  }
}

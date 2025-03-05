import { Request, Response } from 'express'
import AuditService, { Page } from '../../services/auditService'
import ParoleService from '../../services/paroleService'
import { clientToken } from '../clientToken'

export default class PrisonRoutes {
  constructor(
    private readonly auditService: AuditService,
    private readonly paroleService: ParoleService,
  ) {}

  dashboard = async (req: Request, res: Response): Promise<void> => {
    await this.auditService.logPageView(Page.PRISON_DASHBOARD, { who: res.locals.user.username, correlationId: req.id })

    res.render('pages/prisons/dashboard')
  }

  parole = async (req: Request, res: Response): Promise<void> => {
    await this.auditService.logPageView(Page.PAROLE_CASES_PAGE, {
      who: res.locals.user.username,
      correlationId: req.id,
    })

    const paroleCases = await this.paroleService.listParoleCases(clientToken(req))

    res.render('pages/prisons/parole', { paroleCases })
  }
}

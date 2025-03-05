import { RequestHandler } from 'express'
import { dataAccess } from '../data'
import AuditService from './auditService'
import ParoleService from './paroleService'

export const services = () => {
  const { applicationInfo, hmppsAuditClient, hmppsAuthClient, managePomCasesApiClient } = dataAccess()

  const auditService = new AuditService(hmppsAuditClient)
  const paroleService = new ParoleService(managePomCasesApiClient)

  return {
    applicationInfo,
    auditService,
    hmppsAuthClient,
    paroleService,
  }
}

export type Services = ReturnType<typeof services>
export type RequestHandlerWithServices = (services?: Services) => RequestHandler
export { RequestHandler }

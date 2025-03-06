import RestClient from './restClient'
import config, { ApiConfig } from '../config'
import { UpcomingParoleCase } from '../@types/shared'

export default class ManagePomCasesApiClient {
  private restClient: RestClient

  constructor(token: string) {
    this.restClient = new RestClient('managePomCasesApi', config.apis.managePomCasesApi as ApiConfig, token)
  }

  async upcomingParoleCases(): Promise<UpcomingParoleCase[]> {
    return this.restClient.get<UpcomingParoleCase[]>({ path: '/parole-cases/upcoming' })
  }
}

import RestClient from './restClient'
import config, { ApiConfig } from '../config'
import { ParoleCase } from '../@types/shared'

export default class ManagePomCasesApiClient {
  private restClient: RestClient

  constructor(token: string) {
    this.restClient = new RestClient('managePomCasesApi', config.apis.managePomCasesApi as ApiConfig, token)
  }

  async listParoleCases(): Promise<ParoleCase[]> {
    return this.restClient.get<ParoleCase[]>({ path: '/parole-cases' })
  }
}

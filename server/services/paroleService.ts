import { ManagePomCasesApiClient, RestClientBuilder } from '../data'
import { ParoleCase } from '../@types/shared'

export default class ParoleService {
  constructor(private readonly managePomCasesApiClient: RestClientBuilder<ManagePomCasesApiClient>) {}

  public async listParoleCases(token: string): Promise<ParoleCase[]> {
    return this.managePomCasesApiClient(token).listCases()
  }
}

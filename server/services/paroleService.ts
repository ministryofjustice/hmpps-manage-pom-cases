import { ManagePomCasesApiClient, RestClientBuilder } from '../data'
import { UpcomingParoleCase } from '../@types/shared'

export default class ParoleService {
  constructor(private readonly managePomCasesApiClient: RestClientBuilder<ManagePomCasesApiClient>) {}

  public async upcomingCases(token: string): Promise<UpcomingParoleCase[]> {
    return this.managePomCasesApiClient(token).upcomingParoleCases()
  }
}

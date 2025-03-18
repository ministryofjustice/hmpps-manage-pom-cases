import { ManagePomCasesApiClient, RestClientBuilder } from '../data'
import { PrisonUser } from '../interfaces/hmppsUser'

export default class StaffService {
  constructor(private readonly managePomCasesApiClient: RestClientBuilder<ManagePomCasesApiClient>) {}

  public async userHasPomRole(token: string, user: PrisonUser): Promise<boolean> {
    return this.managePomCasesApiClient(token).userHasPomRole(user.staffId, user.activeCaseLoadId)
  }
}

import { type NextParoleDate } from './NextParoleDate'
import { type Offender } from './Offender'
import { type Pom } from './Pom'

// TODO: obviously this is just a rough schema, we need to define the actual schema
export type ParoleCase = {
  offender: Offender
  pom: Pom
  pomRole: string
  nextParoleDate: NextParoleDate
}

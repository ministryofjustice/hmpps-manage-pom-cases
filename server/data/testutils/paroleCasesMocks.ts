import { type NextParoleDate } from '../../@types/shared/models/NextParoleDate'
import { type ParoleCase } from '../../@types/shared'
import { returnOffender } from './offenderMocks'
import { returnPom } from './pomMocks'

const returnNextParoleDate = ({ date = '06 Jun 2025', dateType = 'TED' } = {}): NextParoleDate => ({
  date,
  dateType,
})

const returnParoleCase = ({
  offender = returnOffender(),
  pom = returnPom(),
  pomRole = 'Supporting',
  nextParoleDate = returnNextParoleDate(),
} = {}): ParoleCase => ({
  offender,
  pom,
  pomRole,
  nextParoleDate,
})

export { returnParoleCase }

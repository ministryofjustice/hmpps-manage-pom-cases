import { type Offender } from '../../@types/shared'

const returnOffender = ({ firstName = 'John', lastName = 'Doe', nomisId = 'A1234AA' } = {}): Offender => ({
  firstName,
  lastName,
  nomisId,
})

export { returnOffender }

import { type Pom } from '../../@types/shared'

const returnPom = ({ firstName = 'MOIC', lastName = 'Pom', staffId = 12345 } = {}): Pom => ({
  firstName,
  lastName,
  staffId,
})

export { returnPom }

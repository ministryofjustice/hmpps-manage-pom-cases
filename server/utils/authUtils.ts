import AuthRole from '../data/authRole'

const hasRole = (user: Express.User, role: AuthRole): boolean => user?.userRoles.includes(role) || false

const userIsAdmin = (user: Express.User): boolean => hasRole(user, AuthRole.ADMIN)
const userIsSpo = (user: Express.User): boolean => hasRole(user, AuthRole.SPO)

// TODO: additional staff check required
const userIsPom = (user: Express.User): boolean => hasRole(user, AuthRole.POM)

export { userIsAdmin, userIsPom, userIsSpo }

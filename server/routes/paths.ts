import { path } from 'static-path'

const root = path('/')

const prisons = path('/prisons')
const dashboard = prisons.path(':prisonCode/dashboard')
const parole = prisons.path(':prisonCode/parole_cases')

const paths = {
  root,
  prisons: {
    dashboard,
    parole,
  },
}

export default paths

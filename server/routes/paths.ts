import { path } from 'static-path'

const root = path('/')
const prisons = path('/prisons/:prisonCode')
const prisoners = prisons.path('prisoners')
const handovers = prisons.path('handovers')
const poms = prisons.path('poms')
const staff = prisons.path('staff/:staffId')

const paths = {
  root,

  // This corresponds with the top level navigation header
  pomCases: {
    dashboard: prisons.path('dashboard'),
  },
  allocations: {
    unallocated: prisoners.path('unallocated'),
    show: prisoners.path(':caseId/allocation'),
  },
  parole: {
    cases: prisons.path('parole_cases'),
  },
  handover: {
    upcoming: handovers.path('upcoming'),
  },
  staff: {
    poms,
    show: poms.path(':staffId'),
    caseload: staff.path('caseload'),
  },
}

export default paths

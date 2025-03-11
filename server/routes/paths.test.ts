import paths from './paths'

describe('paths', () => {
  it('should generate the correct root path', () => {
    expect(paths.root({})).toBe('/')
  })

  it('should generate the correct dashboard path', () => {
    const prisonCode = 'ABC123'
    expect(paths.pomCases.dashboard({ prisonCode })).toBe(`/prisons/${prisonCode}/dashboard`)
  })

  it('should generate the correct parole cases path', () => {
    const prisonCode = 'ABC123'
    expect(paths.parole.cases({ prisonCode })).toBe(`/prisons/${prisonCode}/parole_cases`)
  })

  it('should generate the correct unallocated path', () => {
    const prisonCode = 'ABC123'
    expect(paths.allocations.unallocated({ prisonCode })).toBe(`/prisons/${prisonCode}/prisoners/unallocated`)
  })

  it('should generate the correct allocation show path', () => {
    const prisonCode = 'ABC123'
    const caseId = 'CASE123'
    expect(paths.allocations.show({ prisonCode, caseId })).toBe(`/prisons/${prisonCode}/prisoners/${caseId}/allocation`)
  })

  it('should generate the correct upcoming handover path', () => {
    const prisonCode = 'ABC123'
    expect(paths.handover.upcoming({ prisonCode })).toBe(`/prisons/${prisonCode}/handovers/upcoming`)
  })

  it('should generate the correct staff poms path', () => {
    const prisonCode = 'ABC123'
    expect(paths.staff.poms({ prisonCode })).toBe(`/prisons/${prisonCode}/poms`)
  })

  it('should generate the correct staff show path', () => {
    const prisonCode = 'ABC123'
    const staffId = 'STAFF123'
    expect(paths.staff.show({ prisonCode, staffId })).toBe(`/prisons/${prisonCode}/poms/${staffId}`)
  })

  it('should generate the correct staff caseload path', () => {
    const prisonCode = 'ABC123'
    const staffId = 'STAFF123'
    expect(paths.staff.caseload({ prisonCode, staffId })).toBe(`/prisons/${prisonCode}/staff/${staffId}/caseload`)
  })
})

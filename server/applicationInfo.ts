import config from './config'

const { buildNumber, gitRef, productId, branchName } = config

export type ApplicationInfo = {
  applicationName: string
  buildNumber: string
  gitRef: string
  gitShortHash: string
  productId: string
  branchName: string
}

export default (): ApplicationInfo => {
  const applicationName: string = 'HMPPS Manage POM Cases'
  return { applicationName, buildNumber, gitRef, gitShortHash: gitRef.substring(0, 7), productId, branchName }
}

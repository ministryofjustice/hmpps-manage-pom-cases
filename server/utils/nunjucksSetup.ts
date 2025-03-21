/* eslint-disable no-param-reassign */
import path from 'path'
import nunjucks from 'nunjucks'
import express from 'express'
import fs from 'fs'
import { Params, Path } from 'static-path'
import { initialiseName, formatDate, convertToTitleCase } from './utils'
import config from '../config'
import logger from '../../logger'
import paths from '../routes/paths'
import applicationInfo from '../applicationInfo'

export default function nunjucksSetup(app: express.Express): void {
  app.set('view engine', 'njk')

  app.locals.asset_path = '/assets/'
  app.locals.applicationName = applicationInfo().applicationName
  app.locals.environmentName = config.environmentName
  app.locals.environmentNameColour = config.environmentName === 'PRE-PRODUCTION' ? 'govuk-tag--green' : ''
  let assetManifest: Record<string, string> = {}

  try {
    const assetMetadataPath = path.resolve(__dirname, '../../assets/manifest.json')
    assetManifest = JSON.parse(fs.readFileSync(assetMetadataPath, 'utf8'))
  } catch (e) {
    if (process.env.NODE_ENV !== 'test') {
      logger.error(e, 'Could not read asset manifest file')
    }
  }

  app.use((req, res, next) => {
    res.locals.currentUrl = req.originalUrl
    return next()
  })

  const njkEnv = nunjucks.configure(
    [
      path.join(__dirname, '../../server/views'),
      'node_modules/govuk-frontend/dist/',
      'node_modules/govuk-frontend/dist/components/',
      'node_modules/@ministryofjustice/frontend/',
      'node_modules/@ministryofjustice/frontend/moj/components/',
      'node_modules/@ministryofjustice/hmpps-connect-dps-components/dist/assets/',
    ],
    {
      autoescape: true,
      express: app,
    },
  )

  njkEnv.addGlobal('paths', paths)

  njkEnv.addFilter('toPath', <T extends string>(staticPath: Path<T>, params: Params<T>) => {
    if (!staticPath) {
      throw Error(`no path provided`)
    }
    return staticPath(params)
  })

  njkEnv.addFilter('toLegacyUrl', <T extends string>(staticPath: Path<T>, params: Params<T>) => {
    return config.legacyAppUrl + njkEnv.getFilter('toPath')(staticPath, params)
  })

  njkEnv.addGlobal(
    'isActiveHeaderSection',
    <T extends string>(currentUrl: string, sectionPaths: Record<string, Path<T>>) => {
      return Object.values(sectionPaths)
        .map(sp => sp.pattern)
        .some(pattern => new RegExp(`^${pattern.replace(/:[^\s/]+/g, '[^/]+')}$`).test(currentUrl))
    },
  )

  njkEnv.addFilter('formatDate', formatDate)
  njkEnv.addFilter('initialiseName', initialiseName)
  njkEnv.addFilter('convertToTitleCase', convertToTitleCase)
  njkEnv.addFilter('assetMap', (url: string) => assetManifest[url] || url)
}

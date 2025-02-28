import { type RequestHandler, Router } from 'express'
import * as home from './home/controller'
import asyncMiddleware from '../middleware/asyncMiddleware'
import type { Services } from '../services'
import roleCheckMiddleware from '../middleware/roleCheckMiddleware'
import AuthRole from '../data/authRole'

export default function routes(services: Services): Router {
  const router = Router()

  const checkUserHasAccess = roleCheckMiddleware([AuthRole.POM, AuthRole.SPO])

  const get = (path: string, ...handlers: RequestHandler[]) => router.get(path, handlers.map(asyncMiddleware))
  // const post = (path: string, ...handlers: RequestHandler[]) => router.post(path, handlers.map(asyncMiddleware))
  // const destroy = (path: string, ...handlers: RequestHandler[]) => router.delete(path, handlers.map(asyncMiddleware))

  get('/', checkUserHasAccess, home.index(services))

  return router
}

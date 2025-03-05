import { Request } from 'express'

export const clientToken = (req: Request) => req?.middleware?.clientToken

import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { messages, httpStatus } from './constants'
import { apiConfig } from './api.config'

export const handleAuthorization = (req: Request, resp: Response, next) => {
  const token = getToken(req)
  if (!token) {
    resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"')
    resp.status(httpStatus.unauthorized).json({
      message: messages.needsAuth
    })
  } else {
    jwt.verify(token, apiConfig.secret, (err, decoded) => {
      if (decoded) {
        next()
      } else {
        resp.status(httpStatus.forbidden).json({
          message: messages.notAuthorized
        })
      }
    })
  }
}

function getToken(req: Request): string {
  let token = undefined
  if (req.headers && req.headers.authorization) {
    const parts: string[] = req.headers.authorization.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1]
    }
  }
  return token
}

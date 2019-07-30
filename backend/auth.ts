import { Request, Response } from 'express'
import { User, users } from './users'
import * as jwt from 'jsonwebtoken'
import { httpStatus, messages } from './constants'
import { apiConfig } from './api.config'

export const handleAuthentication = (req: Request, resp: Response) => {
  const user: User = req.body
  if (valid(user)) {
    const dbUser = users[user.email]
    const token = jwt.sign(
      {
        sub: dbUser.email,
        iss: 'meat-api'
      },
      apiConfig.secret
    )
    resp.json({
      name: dbUser.name,
      email: dbUser.email,
      accessToken: token
    })
  } else {
    resp.status(httpStatus.forbidden).json({
      message: messages.invalidData
    })
  }
}

function valid(user: User): boolean {
  if (!user) {
    return false
  }
  const dbUser = users[user.email]
  return dbUser && dbUser.matches(user)
}

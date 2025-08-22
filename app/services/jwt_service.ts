import jwt from 'jsonwebtoken'
import env from '#start/env'

const JWT_SECRET = env.get('JWT_SECRET')

export class JwtService {
  static sign(payload: object, expiresIn: jwt.SignOptions['expiresIn'] = '7d') {
    return jwt.sign(payload, JWT_SECRET, { expiresIn })
  }

  static verify<T>(token: string): T {
    return jwt.verify(token, JWT_SECRET) as T
  }
}

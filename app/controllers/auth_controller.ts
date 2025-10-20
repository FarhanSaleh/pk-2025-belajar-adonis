import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/users'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'
import env from '#start/env'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const data = request.only(['email', 'password'])
    const isUserExist = await User.findOne({ email: data.email })
    if (!isUserExist) {
      return response.badRequest({ message: 'Password atau Email salah' })
    }

    const isMatch = await hash.verify(isUserExist.password || '', data.password)
    if (!isMatch) {
      return response.badRequest({ message: 'Password atau Email salah' })
    }

    const token = jwt.sign(
      { id: isUserExist.id, email: isUserExist.email },
      env.get('JWT_SECRET') || '',
      {
        expiresIn: '1d',
      }
    )
    return response.ok({ token: token })
  }
}

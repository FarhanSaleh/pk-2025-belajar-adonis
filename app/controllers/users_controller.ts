import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/users'

export default class UsersController {
  async index() {
    const users = await User.find()
    return users
  }
  async show({ params, response }: HttpContext) {
    const user = await User.findById(params.id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    return user
  }
  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'email', 'password'])
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    })
    return response.created(user)
  }
  async update({ params, request, response }: HttpContext) {
    const data = request.only(['name', 'email', 'password'])
    const user = await User.findByIdAndUpdate(
      params.id,
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      { new: true }
    )

    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    return response.ok(user)
  }
  async destroy({ params, response }: HttpContext) {
    const user = await User.findByIdAndDelete(params.id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    return response.ok({ message: 'User deleted successfully' })
  }
}

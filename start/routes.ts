/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')

router.post('/login', [AuthController, 'login'])

router.get('/users', [UsersController, 'index']).use(middleware.auth())
router.get('/users/:id', [UsersController, 'show']).use(middleware.auth())
router.post('/users', [UsersController, 'store'])
router.put('/users/:id', [UsersController, 'update']).use(middleware.auth())
router.delete('/users/:id', [UsersController, 'destroy']).use(middleware.auth())

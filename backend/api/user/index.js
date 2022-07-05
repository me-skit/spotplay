import UserRouter from './Router.js'
import UserController from './controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { DataJson } from '../../store/DataJson.js'
import { helpers } from '../../libs/helpers.js'
import User from '../../entities/User.js'

export const userModule = (expressRouter) => {
  const service = new DataJson()
  const userController = new UserController(service, User, helpers.encryptPassword)
  const userRouter = new UserRouter(expressRouter, userController, response, HttpCode)
  return userRouter._router
}

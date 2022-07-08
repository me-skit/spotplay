import UserRouter from './Router.js'
import UserController from './controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { DbMongo } from '../../store/DbMongo.js'
import { helpers } from '../../libs/helpers.js'
import User from '../../entities/User.js'
import { checkAuthorization } from '../../middleware/secure.js'

export const userModule = (expressRouter) => {
  const service = new DbMongo()
  const userController = new UserController(service, User, helpers.encryptPassword)
  const userRouter = new UserRouter(expressRouter, userController, response, HttpCode, checkAuthorization)
  return userRouter._router
}

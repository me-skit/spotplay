import AuthRouter from './Router.js'
import AuthController from './Controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { DbMongo } from '../../store/DbMongo.js'
import Auth from '../../entities/Auth.js'
import { helpers } from '../../libs/helpers.js'

export const authModule = (expressRouter) => {
  const service = new DbMongo()
  const authController = new AuthController(service, Auth, helpers.comparePassword, helpers.generateToken)
  const authRouter = new AuthRouter(expressRouter, authController, response, HttpCode)
  return authRouter._router
}

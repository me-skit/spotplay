import AuthRouter from './Router.js'
import AuthController from './Controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { DataJson } from '../../store/DataJson.js'
import Auth from '../../entities/Auth.js'
import { helpers } from '../../libs/helpers.js'

export const authModule = (expressRouter) => {
  const service = new DataJson()
  const authController = new AuthController(service, Auth, helpers.comparePassword, helpers.generateToken)
  const authRouter = new AuthRouter(expressRouter, authController, response, HttpCode)
  return authRouter._router
}

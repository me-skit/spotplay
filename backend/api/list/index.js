import ListRouter from './Router.js'
import ListController from './controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { DbMongo } from '../../store/DbMongo.js'
import List from '../../entities/List.js'
import { checkAuthorization } from '../../middleware/secure.js'

export const listModule = (expressRouter) => {
  const service = new DbMongo()
  const listController = new ListController(service, List)
  const listRouter = new ListRouter(expressRouter, listController, response, HttpCode, checkAuthorization)
  return listRouter._router
}

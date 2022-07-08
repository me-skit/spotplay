import SongRouter from './Router.js'
import SongController from './controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { DbMongo } from '../../store/DbMongo.js'
import Song from '../../entities/Song.js'
import { checkAuthorization } from '../../middleware/secure.js'

export const songModule = (expressRouter) => {
  const service = new DbMongo()
  const songController = new SongController(service, Song)
  const songRouter = new SongRouter(expressRouter, songController, response, HttpCode, checkAuthorization)
  return songRouter._router
}

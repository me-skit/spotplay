import ArtistRouter from './Router.js'
import ArtistController from './controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { DbMongo } from '../../store/DbMongo.js'
import Artist from '../../entities/Artist.js'
import { checkAuthorization } from '../../middleware/secure.js'

export const artistModule = (expressRouter) => {
  const service = new DbMongo()
  const artistController = new ArtistController(service, Artist)
  const artistRouter = new ArtistRouter(expressRouter, artistController, response, HttpCode, checkAuthorization)
  return artistRouter._router
}

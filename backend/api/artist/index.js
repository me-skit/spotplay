import ArtistRouter from './Router.js'
import ArtistController from './controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { DataJson } from '../../store/DataJson.js'
import Artist from '../../entities/Artist.js'

export const artistModule = (expressRouter) => {
  const service = new DataJson()
  const artistController = new ArtistController(service, Artist)
  const artistRouter = new ArtistRouter(expressRouter, artistController, response, HttpCode)
  return artistRouter._router
}

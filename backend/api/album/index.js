import AlbumRouter from './Router.js'
import AlbumController from './controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { DataJson } from '../../store/DataJson.js'
import Album from '../../entities/Album.js'

export const albumModule = (expressRouter) => {
  const service = new DataJson()
  const albumController = new AlbumController(service, Album)
  const albumRouter = new AlbumRouter(expressRouter, albumController, response, HttpCode)
  return albumRouter._router
}

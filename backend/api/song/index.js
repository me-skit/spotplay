import SongRouter from './Router.js'
import SongController from './controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { DataJson } from '../../store/DataJson.js'
import Song from '../../entities/Song.js'

export const songModule = (expressRouter) => {
  const service = new DataJson()
  const songController = new SongController(service, Song)
  const songRouter = new SongRouter(expressRouter, songController, response, HttpCode)
  return songRouter._router
}

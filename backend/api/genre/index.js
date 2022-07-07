import GenreRouter from './Router.js'
import GenreController from './controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { DbMongo } from '../../store/DbMongo.js'
import Genre from '../../entities/Genre.js'

export const genreModule = (expressRouter) => {
  const service = new DbMongo()
  const genreController = new GenreController(service, Genre)
  const genreRouter = new GenreRouter(expressRouter, genreController, response, HttpCode)
  return genreRouter._router
}

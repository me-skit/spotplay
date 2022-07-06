import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'
// packs configuration
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
// local modules
import { genreModule } from './genre/index.js'
import { listModule } from './list/index.js'
import { songModule } from './song/index.js'
import { userModule } from './user/index.js'
import { authModule } from './auth/index.js'

class Server {
  constructor (config) {
    this._app = express()
    this._port = config.port
    this._hostname = config.hostname
    this._name = config.appname
    this._dirname = dirname(fileURLToPath(import.meta.url))
    this._swaggerFile = YAML.load(join(dirname(fileURLToPath(import.meta.url)), '../docs/swagger.yaml'))
    this.setMiddlewares()
    this.setRoutes()
  }

  setMiddlewares () {
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(cors())
    this._app.use(morgan('dev'))
  }

  setRoutes () {
    this._app.use('/api/v1/genre', genreModule(express.Router))
    this._app.use('/api/v1/playlist', listModule(express.Router))
    this._app.use('/api/v1/song', songModule(express.Router))
    this._app.use('/api/v1/user', userModule(express.Router))
    this._app.use('/api/v1/auth', authModule(express.Router))
    this._app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(this._swaggerFile))
  }

  start () {
    this._app.set('hostname', this._hostname)
    this._app.listen(this._port, () => {
      console.log(`${this._name} is running on http://${this._hostname}:${this._port}`)
    })
  }
}

export default Server

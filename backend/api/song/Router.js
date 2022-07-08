import { validationResult } from 'express-validator'
import { songValidations as validations } from './validations.js'

class SongRouter {
  constructor (router, controller, response, httpCode, checkAuthorization) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this._validations = validations
    this._validationResult = validationResult
    this._checkToken = checkAuthorization
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.get('/', this._checkToken('read'), this.handleGetSongs.bind(this))
    this._router.get('/:id', this._checkToken('read'), this.handleGetSong.bind(this))
    this._router.post('/', [this._checkToken('edit'), this._validations], this.handlePostSong.bind(this))
    this._router.delete('/:id', this._checkToken('edit'), this.handleDeleteSong.bind(this))
    this._router.put('/:id', this._checkToken('edit'), this.handleUpdateSong.bind(this))
  }

  async handleGetSongs (req, res) {
    try {
      const result = await this._controller.getAllSongs()
      if (result.length === 0) {
        this._response.success(req, res, 'No hay canciones', this._httpCode.NOT_FOUND)
      } else {
        this._response.success(req, res, result, this._httpCode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleGetSong (req, res) {
    try {
      const result = await this._controller.getSong(req.params.id)
      if (result) {
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handlePostSong (req, res) {
    const errors = this._validationResult(req)

    if (errors.isEmpty()) {
      const data = req.body
      const result = await this._controller.createNewSong(data)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } else {
      this._response.error(req, res, errors, this._httpCode.BAD_REQUEST)
    }
  }

  async handleDeleteSong (req, res) {
    try {
      const result = await this._controller.deleteSong(req.params.id)
      if (result) {
        this._response.success(req, res, 'Item deleted at songs table', this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleUpdateSong (req, res) {
    const errors = this._validationResult(req)

    if (errors.isEmpty()) {
      try {
        const data = req.body
        const result = await this._controller.updateSong(data, req.params.id)
        if (result) {
          this._response.success(req, res, 'Item modified at songs table', this._httpCode.OK)
        } else {
          this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
        }
      } catch (error) {
        this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
      }
    } else {
      this._response.error(req, res, errors, this._httpCode.BAD_REQUEST)
    }
  }
}

export default SongRouter

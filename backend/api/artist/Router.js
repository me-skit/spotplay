import { validationResult } from 'express-validator'
import { artistValidations as validations } from './validations.js'

class ArtistRouter {
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
    this._router.get('/', this._checkToken('read'), this.handleGetArtists.bind(this))
    this._router.get('/:id', this._checkToken('read'), this.handleGetArtist.bind(this))
    this._router.post('/', [this._checkToken('edit'), this._validations], this.handlePostArtist.bind(this))
    this._router.delete('/:id', this._checkToken('edit'), this.handleDeleteArtist.bind(this))
    this._router.put('/:id', [this._checkToken('edit'), this._validations], this.handleUpdateArtist.bind(this))
  }

  async handleGetArtists (req, res) {
    try {
      const result = await this._controller.getAllArtists()
      if (result.length === 0) {
        this._response.success(req, res, 'No hay artistas', this._httpCode.NOT_FOUND)
      } else {
        this._response.success(req, res, result, this._httpCode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleGetArtist (req, res) {
    try {
      const result = await this._controller.getArtist(req.params.id)
      if (result) {
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handlePostArtist (req, res) {
    const errors = this._validationResult(req)

    if (errors.isEmpty()) {
      const data = req.body
      const result = await this._controller.createNewArtist(data)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } else {
      this._response.error(req, res, errors, this._httpCode.BAD_REQUEST)
    }
  }

  async handleDeleteArtist (req, res) {
    try {
      const result = await this._controller.deleteArtist(req.params.id)

      if (result) {
        this._response.success(req, res, 'Item deleted at artists table', this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleUpdateArtist (req, res) {
    const errors = this._validationResult(req)

    if (errors.isEmpty()) {
      try {
        const data = req.body
        const result = await this._controller.updateArtist(data, req.params.id)

        if (result) {
          this._response.success(req, res, 'Item modified at artists table', this._httpCode.OK)
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

export default ArtistRouter

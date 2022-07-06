import { validationResult } from 'express-validator'
import { artistValidations } from './validations.js'

class ArtistRouter {
  constructor (router, controller, response, httpCode) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.get('/', this.handleGetArtists.bind(this))
    this._router.get('/:id', this.handleGetArtist.bind(this))
    this._router.post('/', artistValidations, this.handlePostArtist.bind(this))
    this._router.delete('/:id', this.handleDeleteArtist.bind(this))
    this._router.put('/:id', artistValidations, this.handleUpdateArtist.bind(this))
  }

  handleGetArtists (req, res) {
    try {
      const result = this._controller.getAllArtists()
      if (result.length === 0) {
        this._response.success(req, res, 'No hay artistas', this._httpCode.NOT_FOUND)
      } else {
        this._response.success(req, res, result, this._httpCode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handleGetArtist (req, res) {
    try {
      const artistId = parseInt(req.params.id)
      const result = this._controller.getArtist(artistId)
      if (result) {
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handlePostArtist (req, res) {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      const data = req.body
      const result = this._controller.createNewArtist(data)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } else {
      this._response.error(req, res, errors, this._httpCode.BAD_REQUEST)
    }
  }

  handleDeleteArtist (req, res) {
    try {
      const artistId = parseInt(req.params.id)
      const result = this._controller.getArtist(artistId)
      if (result) {
        const result = this._controller.deleteArtist(artistId)
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handleUpdateArtist (req, res) {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      try {
        const artistId = parseInt(req.params.id)
        const result = this._controller.getArtist(artistId)
        if (result) {
          const data = req.body
          const result = this._controller.updateArtist(data, artistId)
          this._response.success(req, res, result, this._httpCode.OK)
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

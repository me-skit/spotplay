import { validationResult } from 'express-validator'
import { albumValidations as validations } from './validations.js'

class AlbumRouter {
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
    this._router.get('/', this._checkToken('read'), this.handleGetAlbums.bind(this))
    this._router.get('/:id', this._checkToken('read'), this.handleGetAlbum.bind(this))
    this._router.post('/', [this._checkToken('read'), this._validations], this.handlePostAlbum.bind(this))
    this._router.delete('/:id', this._checkToken('read'), this.handleDeleteAlbum.bind(this))
    this._router.put('/:id', this._checkToken('read'), this.handleUpdateAlbum.bind(this))
  }

  async handleGetAlbums (req, res) {
    try {
      const result = await this._controller.getAllAlbums()
      if (result.length === 0) {
        this._response.success(req, res, 'No hay albums aún', this._httpCode.NOT_FOUND)
      } else {
        this._response.success(req, res, result, this._httpCode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleGetAlbum (req, res) {
    try {
      const result = await this._controller.getAlbum(req.params.id)
      if (result) {
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handlePostAlbum (req, res) {
    const errors = this._validationResult(req)

    if (errors.isEmpty()) {
      const data = req.body
      const result = await this._controller.createNewAlbum(data)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } else {
      this._response.error(req, res, errors, this._httpCode.BAD_REQUEST)
    }
  }

  async handleDeleteAlbum (req, res) {
    try {
      const result = await this._controller.deleteAlbum(req.params.id)

      if (result) {
        this._response.success(req, res, 'Item deleted at albums table', this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleUpdateAlbum (req, res) {
    const errors = this._validationResult(req)

    if (errors.isEmpty()) {
      try {
        const data = req.body
        const result = await this._controller.updateAlbum(data, req.params.id)

        if (result) {
          this._response.success(req, res, 'Item modified at albums table', this._httpCode.OK)
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

export default AlbumRouter

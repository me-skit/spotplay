import { validationResult } from 'express-validator'
import { albumValidations } from './validations.js'

class AlbumRouter {
  constructor (router, controller, response, httpCode) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.get('/', this.handleGetAlbums.bind(this))
    this._router.get('/:id', this.handleGetAlbum.bind(this))
    this._router.post('/', albumValidations, this.handlePostAlbum.bind(this))
    this._router.delete('/:id', this.handleDeleteAlbum.bind(this))
    this._router.put('/:id', albumValidations, this.handleUpdateAlbum.bind(this))
  }

  handleGetAlbums (req, res) {
    try {
      const result = this._controller.getAllAlbums()
      if (result.length === 0) {
        this._response.success(req, res, 'No hay albums aún', this._httpCode.NOT_FOUND)
      } else {
        this._response.success(req, res, result, this._httpCode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handleGetAlbum (req, res) {
    try {
      const albumId = parseInt(req.params.id)
      const result = this._controller.getAlbum(albumId)
      if (result) {
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handlePostAlbum (req, res) {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      const data = req.body
      const result = this._controller.createNewAlbum(data)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } else {
      this._response.error(req, res, errors, this._httpCode.BAD_REQUEST)
    }
  }

  handleDeleteAlbum (req, res) {
    try {
      const albumId = parseInt(req.params.id)
      const result = this._controller.getAlbum(albumId)
      if (result) {
        const result = this._controller.deleteAlbum(albumId)
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handleUpdateAlbum (req, res) {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      try {
        const albumId = parseInt(req.params.id)
        const result = this._controller.getAlbum(albumId)
        if (result) {
          const data = req.body
          const result = this._controller.updateAlbum(data, albumId)
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

export default AlbumRouter

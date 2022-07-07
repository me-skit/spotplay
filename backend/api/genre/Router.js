import { validationResult } from 'express-validator'
import { genreValidations } from './validations.js'

class GenreRouter {
  constructor (router, controller, response, httpCode) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.get('/', this.handleGetGenres.bind(this))
    this._router.get('/:id', this.handleGetGenre.bind(this))
    this._router.post('/', genreValidations, this.handlePostGenre.bind(this))
    this._router.delete('/:id', this.handleDeleteGenre.bind(this))
    this._router.put('/:id', genreValidations, this.handleUpdateGenre.bind(this))
  }

  async handleGetGenres (req, res) {
    try {
      const result = await this._controller.getAllGenres()
      if (result.length === 0) {
        this._response.success(req, res, 'No hay géneros aún', this._httpCode.NOT_FOUND)
      } else {
        this._response.success(req, res, result, this._httpCode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleGetGenre (req, res) {
    try {
      const result = await this._controller.getGenre(req.params.id)
      if (result) {
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handlePostGenre (req, res) {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      const data = req.body
      const result = await this._controller.createNewGenre(data)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } else {
      this._response.error(req, res, errors, this._httpCode.BAD_REQUEST)
    }
  }

  async handleDeleteGenre (req, res) {
    try {
      const result = await this._controller.deleteGenre(req.params.id)
      if (result) {
        this._response.success(req, res, 'Item deleted at genres table', this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleUpdateGenre (req, res) {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      try {
        const data = req.body
        const result = await this._controller.updateGenre(data, req.params.id)

        if (result) {
          this._response.success(req, res, 'Item modified at genres table', this._httpCode.OK)
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

export default GenreRouter

import { validationResult } from 'express-validator'
import { listValidations } from './validations.js'

class ListRouter {
  constructor (router, controller, response, httpCode) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.get('/', this.handleGetLists.bind(this))
    this._router.get('/:id', this.handleGetList.bind(this))
    this._router.post('/', listValidations, this.handlePostList.bind(this))
    this._router.delete('/:id', this.handleDeleteList.bind(this))
    this._router.put('/:id', listValidations, this.handleUpdateList.bind(this))
  }

  async handleGetLists (req, res) {
    try {
      const result = await this._controller.getAllLists()
      if (result.length === 0) {
        this._response.success(req, res, 'No hay listas aún', this._httpCode.NOT_FOUND)
      } else {
        this._response.success(req, res, result, this._httpCode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleGetList (req, res) {
    try {
      const result = await this._controller.getList(req.params.id)
      if (result) {
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handlePostList (req, res) {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      const data = req.body
      const result = await this._controller.createNewList(data)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } else {
      this._response.error(req, res, errors, this._httpCode.BAD_REQUEST)
    }
  }

  async handleDeleteList (req, res) {
    try {
      const result = await this._controller.deleteList(req.params.id)

      if (result) {
        this._response.success(req, res, 'Item deleted at list table', this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleUpdateList (req, res) {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      try {
        const data = req.body
        const result = await this._controller.updateList(data, req.params.id)

        if (result) {
          this._response.success(req, res, 'Item modified at list table', this._httpCode.OK)
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

export default ListRouter

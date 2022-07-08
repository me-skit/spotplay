import { validationResult } from 'express-validator'
import { userValidations as validations } from './validations.js'

class UserRouter {
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
    this._router.get('/', this._checkToken('read'), this.handleGetUsers.bind(this))
    this._router.get('/:id', this._checkToken('read'), this.handleGetUser.bind(this))
    this._router.post('/signup', this._validations, this.handlePostUser.bind(this))
    this._router.delete('/:id', this._checkToken('admin'), this.handleDeleteUser.bind(this))
    this._router.put('/:id', this._checkToken('edit'), this.handleUpdateUser.bind(this))
  }

  async handleGetUsers (req, res) {
    try {
      const result = await this._controller.getAllUsers()
      if (result.length === 0) {
        this._response.success(req, res, 'No hay usuarios', this._httpCode.NOT_FOUND)
      } else {
        const users = result.map(item => {
          item._password = ''
          delete item._password
          return item
        })

        this._response.success(req, res, users, this._httpCode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleGetUser (req, res) {
    try {
      const result = await this._controller.getUser(req.params.id)
      if (result) {
        result._password = ''
        delete result._password
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Element not found', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handlePostUser (req, res) {
    const errors = this._validationResult(req)
    if (errors.isEmpty()) {
      const data = req.body
      const result = await this._controller.createNewUser(data)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } else {
      this._response.error(req, res, errors, this._httpCode.BAD_REQUEST)
    }
  }

  async handleDeleteUser (req, res) {
    try {
      const result = await this._controller.deleteUser(req.params.id)
      if (result) {
        this._response.success(req, res, 'Item deleted at users table', this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Element not found', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleUpdateUser (req, res) {
    const errors = this._validationResult(req)

    if (errors.isEmpty()) {
      try {
        const data = req.body
        const result = await this._controller.updateUser(data, req.params.id)
        if (result) {
          this._response.success(req, res, 'Item modified at users table', this._httpCode.OK)
        } else {
          this._response.success(req, res, 'Element not found', this._httpCode.NOT_FOUND)
        }
      } catch (error) {
        this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
      }
    } else {
      this._response.error(req, res, errors, this._httpCode.BAD_REQUEST)
    }
  }
}

export default UserRouter

class UserRouter {
  constructor (router, controller, response, httpCode) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.get('/', this.handleGetUsers.bind(this))
    this._router.get('/:id', this.handleGetUser.bind(this))
    this._router.post('/signup', this.handlePostUser.bind(this))
    this._router.delete('/:id', this.handleDeleteUser.bind(this))
    this._router.put('/:id', this.handleUpdateUser.bind(this))
  }

  handleSingUp (req, res) {
    const result = this._controller.createNewUser(req.body)
    this._response.success(req, res, result, 201)
  }

  handleGetUsers (req, res) {
    try {
      const result = this._controller.getAllUsers()
      if (result.length === 0) {
        this._response.success(req, res, 'No hay usuarios', this._httpCode.NOT_FOUND)
      } else {
        const users = result.map(item => {
          delete item._password
          return item
        })

        this._response.success(req, res, users, this._httpCode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handleGetUser (req, res) {
    try {
      const userId = parseInt(req.params.id)
      const result = this._controller.getUser(userId)
      if (result) {
        delete result._password
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handlePostUser (req, res) {
    const data = req.body
    const result = this._controller.createNewUser(data)
    this._response.success(req, res, result, this._httpCode.CREATED)
  }

  handleDeleteUser (req, res) {
    try {
      const userId = parseInt(req.params.id)
      const result = this._controller.getUser(userId)
      if (result) {
        const result = this._controller.deleteUser(userId)
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handleUpdateUser (req, res) {
    try {
      const userId = parseInt(req.params.id)
      const result = this._controller.getUser(userId)
      if (result) {
        const data = req.body
        const result = this._controller.updateUser(data, userId)
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }
}

export default UserRouter

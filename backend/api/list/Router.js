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
    this._router.post('/', this.handlePostList.bind(this))
    this._router.delete('/:id', this.handleDeleteList.bind(this))
    this._router.put('/:id', this.handleUpdateList.bind(this))
  }

  handleGetLists (req, res) {
    try {
      const result = this._controller.getAllLists()
      if (result.length === 0) {
        this._response.success(req, res, 'No hay listas aún', this._httpCode.NOT_FOUND)
      } else {
        this._response.success(req, res, result, this._httpCode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handleGetList (req, res) {
    try {
      const listId = parseInt(req.params.id)
      const result = this._controller.getList(listId)
      if (result) {
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handlePostList (req, res) {
    const data = req.body
    const result = this._controller.createNewList(data)
    this._response.success(req, res, result, this._httpCode.CREATED)
  }

  handleDeleteList (req, res) {
    try {
      const listId = parseInt(req.params.id)
      const result = this._controller.getList(listId)
      if (result) {
        const result = this._controller.deleteList(listId)
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handleUpdateList (req, res) {
    try {
      const listId = parseInt(req.params.id)
      const result = this._controller.getList(listId)
      if (result) {
        const data = req.body
        const result = this._controller.updateList(data, listId)
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }
}

export default ListRouter

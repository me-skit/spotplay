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
    this._router.post('/', this.handlePostGenre.bind(this))
    this._router.delete('/:id', this.handleDeleteGenre.bind(this))
    this._router.put('/:id', this.handleUpdateGenre.bind(this))
  }

  handleGetGenres (req, res) {
    try {
      const result = this._controller.getAllGenres()
      if (result.length === 0) {
        this._response.success(req, res, 'No hay géneros aún', this._httpCode.NOT_FOUND)
      } else {
        this._response.success(req, res, result, this._httpCode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handleGetGenre (req, res) {
    try {
      const genreId = parseInt(req.params.id)
      const result = this._controller.getGenre(genreId)
      if (result) {
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handlePostGenre (req, res) {
    const data = req.body
    const result = this._controller.createNewGenre(data)
    this._response.success(req, res, result, this._httpCode.CREATED)
  }

  handleDeleteGenre (req, res) {
    try {
      const genreId = parseInt(req.params.id)
      const result = this._controller.getGenre(genreId)
      if (result) {
        const result = this._controller.deleteGenre(genreId)
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handleUpdateGenre (req, res) {
    try {
      const genreId = parseInt(req.params.id)
      const result = this._controller.getGenre(genreId)
      if (result) {
        const data = req.body
        const result = this._controller.updateGenre(data, genreId)
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }
}

export default GenreRouter

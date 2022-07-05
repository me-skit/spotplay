class SongRouter {
  constructor (router, controller, response, httpCode) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.get('/', this.handleGetSongs.bind(this))
    this._router.get('/:id', this.handleGetSong.bind(this))
    this._router.post('/', this.handlePostSong.bind(this))
    this._router.delete('/:id', this.handleDeleteSong.bind(this))
    this._router.put('/:id', this.handleUpdateSong.bind(this))
  }

  handleGetSongs (req, res) {
    try {
      const result = this._controller.getAllSongs()
      if (result.length === 0) {
        this._response.success(req, res, 'No hay canciones', this._httpCode.NOT_FOUND)
      } else {
        this._response.success(req, res, result, this._httpCode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handleGetSong (req, res) {
    try {
      const songId = parseInt(req.params.id)
      const result = this._controller.getSong(songId)
      if (result) {
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handlePostSong (req, res) {
    const data = req.body
    const result = this._controller.createNewSong(data)
    this._response.success(req, res, result, this._httpCode.CREATED)
  }

  handleDeleteSong (req, res) {
    try {
      const songId = parseInt(req.params.id)
      const result = this._controller.getSong(songId)
      if (result) {
        const result = this._controller.deleteSong(songId)
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handleUpdateSong (req, res) {
    try {
      const songId = parseInt(req.params.id)
      const result = this._controller.getSong(songId)
      if (result) {
        const data = req.body
        const result = this._controller.updateSong(data, songId)
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }
}

export default SongRouter

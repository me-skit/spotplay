class GenreController {
  constructor (servicesGenre, genreEntity) {
    this._service = servicesGenre
    this._entity = genreEntity
  }

  getAllGenres () {
    const response = this._service.all('genre')
    return response
  }

  getGenre (id) {
    const response = this._service.getItem('genre', id)
    return response
  }

  createNewGenre (genre) {
    const newGenre = new this._entity(genre)
    const response = this._service.save('genre', newGenre)
    return response
  }

  deleteGenre (id) {
    const response = this._service.delete('genre', id)
    return response
  }

  updateGenre (genre, id) {
    const newGenre = new this._entity(genre)
    const response = this._service.update('genre', newGenre, id)
    return response
  }
}

export default GenreController

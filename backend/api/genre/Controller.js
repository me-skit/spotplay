class GenreController {
  constructor (servicesGenre, genreEntity) {
    this._service = servicesGenre
    this._entity = genreEntity
  }

  async getAllGenres () {
    const response = await this._service.all('genre')
    return response
  }

  async getGenre (id) {
    const response = await this._service.getItem('genre', id)
    return response
  }

  async createNewGenre (genre) {
    const newGenre = new this._entity(genre)
    const response = await this._service.save('genre', newGenre)
    return response
  }

  async deleteGenre (id) {
    const response = await this._service.delete('genre', id)
    return response
  }

  async updateGenre (genre, id) {
    const newGenre = new this._entity(genre)
    const response = await this._service.update('genre', newGenre, id)
    return response
  }
}

export default GenreController

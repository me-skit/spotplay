class ArtistController {
  constructor (servicesArtist, artistEntity) {
    this._service = servicesArtist
    this._entity = artistEntity
  }

  async getAllArtists () {
    const response = await this._service.all('artist')
    return response
  }

  async getArtist (id) {
    const response = await this._service.getItem('artist', id)
    return response
  }

  async createNewArtist (artist) {
    const newArtist = new this._entity(artist)
    const response = await this._service.save('artist', newArtist)
    return response
  }

  async deleteArtist (id) {
    const response = await this._service.delete('artist', id)
    return response
  }

  async updateArtist (artist, id) {
    const newArtist = new this._entity(artist)
    const response = await this._service.update('artist', newArtist, id)
    return response
  }
}

export default ArtistController

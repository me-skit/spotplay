class ArtistController {
  constructor (servicesArtist, artistEntity) {
    this._service = servicesArtist
    this._entity = artistEntity
  }

  getAllArtists () {
    const response = this._service.all('artist')
    return response
  }

  getArtist (id) {
    const response = this._service.getItem('artist', id)
    return response
  }

  createNewArtist (artist) {
    const newArtist = new this._entity(artist)
    const response = this._service.save('artist', newArtist)
    return response
  }

  deleteArtist (id) {
    const response = this._service.delete('artist', id)
    return response
  }

  updateArtist (artist, id) {
    const newArtist = new this._entity(artist)
    const response = this._service.update('artist', newArtist, id)
    return response
  }
}

export default ArtistController

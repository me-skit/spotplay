class AlbumController {
  constructor (servicesAlbum, albumEntity) {
    this._service = servicesAlbum
    this._entity = albumEntity
  }

  async getAllAlbums () {
    const response = await this._service.all('album')
    return response
  }

  async getAlbum (id) {
    const response = await this._service.getItem('album', id)
    return response
  }

  async createNewAlbum (album) {
    const newAlbum = new this._entity(album)
    const response = await this._service.save('album', newAlbum)
    return response
  }

  async deleteAlbum (id) {
    const response = await this._service.delete('album', id)
    return response
  }

  async updateAlbum (album, id) {
    const newAlbum = new this._entity(album)
    const response = await this._service.update('album', newAlbum, id)
    return response
  }
}

export default AlbumController

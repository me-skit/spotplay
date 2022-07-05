class AlbumController {
  constructor (servicesAlbum, albumEntity) {
    this._service = servicesAlbum
    this._entity = albumEntity
  }

  getAllAlbums () {
    const response = this._service.all('album')
    return response
  }

  getAlbum (id) {
    const response = this._service.getItem('album', id)
    return response
  }

  createNewAlbum (album) {
    const newAlbum = new this._entity(album)
    const response = this._service.save('album', newAlbum)
    return response
  }

  deleteAlbum (id) {
    const response = this._service.delete('album', id)
    return response
  }

  updateAlbum (album, id) {
    const newAlbum = new this._entity(album)
    const response = this._service.update('album', newAlbum, id)
    return response
  }
}

export default AlbumController

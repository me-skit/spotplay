class SongController {
  constructor (servicesSong, songEntity) {
    this._service = servicesSong
    this._entity = songEntity
  }

  getAllSongs () {
    const response = this._service.all('song')
    return response
  }

  getSong (id) {
    const response = this._service.getItem('song', id)
    return response
  }

  createNewSong (song) {
    const newSong = new this._entity(song)
    const response = this._service.save('song', newSong)
    return response
  }

  deleteSong (id) {
    const response = this._service.delete('song', id)
    return response
  }

  updateSong (song, id) {
    const newSong = new this._entity(song)
    const response = this._service.update('song', newSong, id)
    return response
  }
}

export default SongController

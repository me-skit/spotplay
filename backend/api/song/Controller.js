class SongController {
  constructor (servicesSong, songEntity) {
    this._service = servicesSong
    this._entity = songEntity
  }

  async getAllSongs () {
    const response = await this._service.all('song')
    return response
  }

  async getSong (id) {
    const response = await this._service.getItem('song', id)
    return response
  }

  async createNewSong (song) {
    const newSong = new this._entity(song)
    const response = await this._service.save('song', newSong)
    return response
  }

  async deleteSong (id) {
    const response = await this._service.delete('song', id)
    return response
  }

  async updateSong (song, id) {
    const newSong = new this._entity(song)
    const response = await this._service.update('song', newSong, id)
    return response
  }
}

export default SongController

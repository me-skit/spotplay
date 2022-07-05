class Song {
  constructor (song) {
    this._id = null
    this._title = song.title
    this._uri = song.uri
    this._duration = song.duration
    this._year = song.year
    this._image = song.image
    this._idArtist = song.idArtist
    this._idGenre = song.idGenre
    this._idAlbum = song.idAlbum
  }
}

export default Song

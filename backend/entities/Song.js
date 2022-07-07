class Song {
  constructor (song) {
    this._id = null
    this._title = song.title
    this._uri = song.uri
    this._duration = song.duration
    this._year = song.year
    this._image = song.image
    this._artistId = song.artistId
    this._genreId = song.genreId
    this._albumId = song.albumId
  }
}

export default Song

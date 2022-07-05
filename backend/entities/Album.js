class Album {
  constructor (album) {
    this._id = null
    this._name = album.name
    this._year = album.year
    this._cover = album.cover
    this._artistId = album.artistId
  }
}

export default Album

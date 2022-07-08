import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  _username: {
    type: String,
    required: true
  },
  _email: {
    type: String,
    required: false
  },
  _password: {
    type: String,
    required: true
  },
  _role: {
    type: String,
    required: true
  }
})

const songSchema = new mongoose.Schema({
  _title: {
    type: String,
    required: true
  },
  _uri: {
    type: String,
    required: true
  },
  _duration: {
    type: String,
    required: false
  },
  _year: {
    type: Number,
    required: false
  },
  _image: {
    type: String,
    required: false
  },
  _artistId: {
    type: String,
    required: false
  },
  _genreId: {
    type: String,
    required: false
  },
  _albumId: {
    type: String,
    required: false
  }
})

const listSchema = new mongoose.Schema({
  _name: {
    type: String,
    required: true
  },
  _userId: {
    type: String,
    required: true
  }
})

const genreSchema = new mongoose.Schema({
  _name: {
    type: String,
    required: true
  }
})

const artistSchema = new mongoose.Schema({
  _name: {
    type: String,
    required: true
  },
  _avatar: {
    type: String,
    required: false
  }
})

const albumSchema = new mongoose.Schema({
  _name: {
    type: String,
    required: true
  },
  _year: {
    type: Number,
    required: false
  },
  _cover: {
    type: String,
    required: false
  },
  _artistId: {
    type: String,
    required: true
  }
})

const userModel = mongoose.model('User', userSchema)
const songModel = mongoose.model('Song', songSchema)
const listModel = mongoose.model('List', listSchema)
const genreModel = mongoose.model('Genre', genreSchema)
const artistModel = mongoose.model('Artist', artistSchema)
const albumModel = mongoose.model('Album', albumSchema)

export const models = {
  user: userModel,
  song: songModel,
  list: listModel,
  genre: genreModel,
  artist: artistModel,
  album: albumModel
}

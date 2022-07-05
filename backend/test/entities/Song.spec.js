import { expect } from 'chai'
import { describe, it } from 'mocha'
import Song from '../../entities/Song.js'

describe('Testing Song class', () => {
  const song = new Song({
    title: 'title',
    uri: 'uri',
    duration: 'duration',
    image: 'image',
    year: 1995,
    idArtist: 1,
    idGenre: 2,
    idAlbum: 5
  })

  it('Should not be null', () => {
    expect(song).to.notEqual(null)
  })

  it('Shold have a title', () => {
    expect(song._title).to.equal('title')
  })

  it('Year should be a number', () => {
    const result = song._year
    expect(result).to.equal(1995)
  })
})

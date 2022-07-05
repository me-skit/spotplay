import { expect } from 'chai'
import { describe, it } from 'mocha'
import Album from '../../entities/Album.js'

describe('Testing album class', () => {
  const album = new Album({
    name: 'A name',
    year: 2020,
    cover: 'A cover',
    artistId: 1
  })

  it('Should not be null', () => {
    expect(album).to.notEqual(null)
  })

  it('Shold have a name', () => {
    expect(album._name).to.equal('A name')
  })

  it('Year should be a number', () => {
    const result = album._year
    expect(result).to.equal(2020)
  })
})

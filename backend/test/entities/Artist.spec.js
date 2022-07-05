import { expect } from 'chai'
import { describe, it } from 'mocha'
import Artist from '../../entities/Artist.js'

describe('Testing artist class', () => {
  const artist = new Artist({
    name: 'name',
    avatar: 'image_path'
  })

  it('Should not be null', () => {
    expect(artist).to.notEqual(null)
  })

  it('Shold have a name', () => {
    expect(artist._name).to.equal('name')
  })

  it('Avatar should be a string', () => {
    const result = artist._avatar
    expect(result).to.equal('image_path')
  })
})

import { expect } from 'chai'
import { describe, it } from 'mocha'
import Genre from '../../entities/Genre.js'

describe('Testing genre class', () => {
  const genre = new Genre({
    id: 1,
    name: 'name'
  })

  it('Should not be null', () => {
    expect(genre).to.notEqual(null)
  })

  it('Shold have a name', () => {
    expect(genre._name).to.equal('name')
  })

  it('Id should be a number', () => {
    const result = genre._id
    expect(result).to.equal(1)
  })
})

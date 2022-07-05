import { expect } from 'chai'
import { describe, it } from 'mocha'
import List from '../../entities/List.js'

describe('Testing list class', () => {
  const list = new List({
    name: 'name',
    userId: 5
  })

  it('Should not be null', () => {
    expect(list).to.notEqual(null)
  })

  it('Shold have a name', () => {
    expect(list._name).to.equal('name')
  })

  it('User id should be a number', () => {
    const result = list._userId
    expect(result).to.equal(5)
  })
})

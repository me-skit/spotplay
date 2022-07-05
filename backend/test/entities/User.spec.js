import { expect } from 'chai'
import { describe, it } from 'mocha'
import User from '../../entities/User.js'

describe('Testing user class', () => {
  const user = new User({
    username: 'user',
    email: 'user@mail.com',
    password: 'Pa55w0rd',
    role: 'editor'
  })

  it('Should not be null', () => {
    expect(user).to.notEqual(null)
  })

  it('Shold have a username', () => {
    expect(user._username).to.equal('user')
  })

  it('Should hae a password', () => {
    const result = user._password
    expect(result).to.equal('Pa55w0rd')
  })
})

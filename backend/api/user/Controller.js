class UserController {
  constructor (serviceUser, userEntity, hashMethod) {
    this._service = serviceUser
    this._entity = userEntity
    this._hashMethod = hashMethod
  }

  getAllUsers () {
    const response = this._service.all('user')
    return response
  }

  getUser (id) {
    const response = this._service.getItem('user', id)
    return response
  }

  createNewUser (user) {
    const newUser = new this._entity(user)
    newUser.encryptPassword(user.password, this._hashMethod)
    const response = this._service.save('user', newUser)
    return response
  }

  deleteUser (id) {
    const response = this._service.delete('user', id)
    return response
  }

  updateUser (user, id) {
    const newUser = new this._entity(user)
    newUser.encryptPassword(user.password, this._hashMethod)
    const response = this._service.update('user', newUser, id)
    return response
  }
}

export default UserController

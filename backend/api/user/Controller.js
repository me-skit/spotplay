class UserController {
  constructor (serviceUser, userEntity, hashMethod) {
    this._service = serviceUser
    this._entity = userEntity
    this._hashMethod = hashMethod
  }

  async getAllUsers () {
    const response = await this._service.all('user')
    return response
  }

  async getUser (id) {
    const response = await this._service.getItem('user', id)
    return response
  }

  async createNewUser (user) {
    const newUser = new this._entity(user)
    newUser.encryptPassword(user.password, this._hashMethod)
    const response = await this._service.save('user', newUser)
    return response
  }

  async deleteUser (id) {
    const response = await this._service.delete('user', id)
    return response
  }

  async updateUser (user, id) {
    const newUser = new this._entity(user)
    if (newUser._password) {
      newUser.encryptPassword(user.password, this._hashMethod)
    }

    const response = await this._service.update('user', newUser, id)
    return response
  }
}

export default UserController

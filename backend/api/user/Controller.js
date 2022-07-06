class UserController {
  constructor (serviceUser, userEntity, hashMethod) {
    this._service = serviceUser
    this._entity = userEntity
    this._hashMethod = hashMethod
  }

  async getAllUsers () {
    const response = await this._service.all('users')
    return response
  }

  async getUser (id) {
    const response = await this._service.getItem('users', id)
    return response
  }

  async createNewUser (user) {
    const newUser = new this._entity(user)
    newUser.encryptPassword(user.password, this._hashMethod)
    const response = await this._service.save('users', newUser)
    return response
  }

  async deleteUser (id) {
    const response = await this._service.delete('users', id)
    return response
  }

  async updateUser (user, id) {
    const newUser = new this._entity(user)
    newUser.encryptPassword(user.password, this._hashMethod)
    const response = await this._service.update('users', newUser, id)
    return response
  }
}

export default UserController

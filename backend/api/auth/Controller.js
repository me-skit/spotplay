export default class AuthController {
  constructor (authServices, entity, comparePassword, generateToken) {
    this._service = authServices
    this._entity = entity
    this._comparePassword = comparePassword
    this._generateToken = generateToken
  }

  async authenticationUser (user) {
    try {
      const result = (await this._service.findByAttribute('user', '_username', user.username))[0]
      if (result) {
        const compareResult = this._comparePassword(user.password, result._password)
        if (compareResult) {
          const userToken = this._generateToken(result._id)
          return new this._entity({
            state: true,
            username: result._username,
            email: result._email,
            token: userToken,
            message: 'Login successful'
          })
        } else {
          return new this._entity({
            state: false,
            username: '',
            email: '',
            token: '',
            message: 'Sus credenciales son incorrectas'
          })
        }
      } else {
        return new this._entity({})
      }
    } catch (error) {
      return new Error(error)
    }
  }
}

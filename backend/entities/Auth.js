export default class Auth {
  constructor (auth) {
    this._auth = auth.state || false
    this._username = auth.username || ''
    this._email = auth.email || ''
    this._token = auth.token || ''
    this._message = auth.message || ''
  }
}

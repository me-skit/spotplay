export default class AuthRouter {
  constructor (router, controller, response, httpCode) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.post('/signin', this.handleSignin.bind(this))
  }

  async handleSignin (req, res) {
    try {
      const result = await this._controller.authenticationUser(req.body)
      if (result._auth) {
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, result, this._httpCode.BAD_REQUEST)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }
}

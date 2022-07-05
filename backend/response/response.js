import { HttpCode } from './httpcode.js'

export const response = {
  success: function (req, res, message, status) {
    const statusCode = status || HttpCode.OK
    const statusMessage = message || 'ok'
    res.status(statusCode).send({
      request: req.method + ' ' + req.url,
      error: false,
      status: statusCode,
      body: statusMessage
    })
  },
  error: function (req, res, message, status) {
    const statusCode = status || HttpCode.INTERNAL_SERVER_ERROR
    const statusMessage = message || 'Internal server error'
    res.status(statusCode).send({
      request: req.method + ' ' + req.url,
      error: true,
      status: statusCode,
      body: statusMessage
    })
  }
}

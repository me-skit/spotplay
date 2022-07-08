import { helpers } from '../../libs/helpers.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'

export const checkToken = async (req, res, next) => {
  const token = req.headers['x-access-token'] || ''
  if (token) {
    const verify = await helpers.verifyToken(token)
    try {
      if (verify) {
        console.log('Token valido')
        next()
      } else {
        console.log('Token invalid')
        return response.error(req, res, 'Token invalid', HttpCode.UNAUTHORIZED)
      }
    } catch (error) {
      console.log('Invalid token')
      return response.error(req, res, 'Invalid token', HttpCode.UNAUTHORIZED)
    }
  } else {
    return response.error(req, res, 'Token not found', HttpCode.UNAUTHORIZED)
  }
}

import { helpers } from '../libs/helpers.js'
import { response } from '../response/response.js'
import { HttpCode } from '../response/httpcode.js'

export const checkAuthorization = (actionType) => {
  const checkFunction = async (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'].split(' ')[1] || ''
    if (token) {
      const verify = await helpers.verifyToken(token)
      try {
        if (verify) {
          console.log('Token valido')
          const role = verify.role
          if (actionType === 'edit') {
            if (role === 'reader') {
              return response.error(req, res, 'No authorizado, debes ser al menos usuario editor', HttpCode.UNAUTHORIZED)
            }
          }

          if (actionType === 'admin') {
            if ((role === 'reader') || (role === 'editor')) {
              return response.error(req, res, 'No authorizado, debes ser administrador', HttpCode.UNAUTHORIZED)
            }
          }

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

  return checkFunction
}

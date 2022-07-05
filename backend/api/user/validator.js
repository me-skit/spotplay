export const validateUser = (req, res, next) => {
  console.log('I\'m a middleware')
  next()
}

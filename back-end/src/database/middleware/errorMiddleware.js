module.exports = (error, _req, res, _next) => {
  const { message, status } = error
  if (status) {
   return res.status(status).json({ message })
  }
  return res.status(500).json({ message })
}
const app = require('./app')
const http = require('http')
// config database
// logger

const server = http.createServer(app)
const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const app = require('./app')
const http = require('http')
// config database
const config = require('./utils/config/mongDB')
// logger

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

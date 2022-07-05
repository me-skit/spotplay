import Server from './Server.js'
import { config } from '../config/default.js'

function main (apiconfig) {
  const server = new Server(apiconfig)
  server.start()
}

main(config.api)

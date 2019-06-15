const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  let server = app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

  socketStart(server)
  console.log('Socket.IO starts')
}

let messageQueue = []

function socketStart(server) {
  const io = require('socket.io').listen(server)

  io.on('connection', socket => {
    console.log('id:' + socket.id + 'is connected')

    if (messageQueue.length > 0) {
      messageQueue.forEach(message => {
        socket.emit('new-message', message)
      })
    }

    socket.on('send-message', message => {
      console.log(message)

      messageQueue.push(message)

      socket.broadcast.emit('new-message', message)

      if (messageQueue.length > 10) {
        messageQueue = messageQueue.slice(-10)
      }
    })
  })
}

start()

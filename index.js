import express from 'express'
import http from 'http'
import path from 'path'
import { Server as SocketIO } from 'socket.io'

const port = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = new SocketIO(server)

app.use(express.static(path.resolve('public')))

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('message', (message) => {
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log('listening on port', port)
})
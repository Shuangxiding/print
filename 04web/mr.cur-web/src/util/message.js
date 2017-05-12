import app from '@/config/app'

export default {
  init() {
    let url = app.debug ? app.websocket.dev : app.websocket.pro
    let socket = new WebSocket(url)
    let a = 0
    socket.onopen = function (...args) {
      console.log(args)
    }
    socket.onmessage = function (...args) {
      console.log(args)
      if (a === 0) {
        a++
        socket.send('JWNIFYHB1w8m8kulDc1jJWn-gZ6MJ9nTOgZGBpYy')
      }
    }
  },
  /**
   * 添加消息坚挺
   */
  addListener() {

  }
}

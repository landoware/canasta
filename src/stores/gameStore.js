function dial() {
  url = import.meta.env.VITE_WS_URL
  const conn = new WebSocket(url)

  conn.addEventListener('close', ev => {
    console.info(`WebSocket Disconnected: ${ev.code}, reason: ${ev.reason}`, true)
    if (ev.code !== 1001) {
      console.info('Reconnecting in 1s', true)
      setTimeout(dial, 1000)
    }
  })
  conn.addEventListener('open', ev => {
    console.info('websocket connected')
  })

  conn.addEventListener('message', ev => {
    if (typeof ev.data !== 'string') {
      console.error('unexpected message type', typeof ev.data)
      return
    }
    const p = consold.info(ev.data)
    if (expectingMessage) {
      p.scrollIntoView()
      expectingMessage = false
    }
  })
}

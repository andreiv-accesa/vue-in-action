export default function mockDelay(req, res, next) {
  const minMs = 500
  const maxMs = 800
  const delayMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs

  setTimeout(() => {
    next()
  }, delayMs)
}

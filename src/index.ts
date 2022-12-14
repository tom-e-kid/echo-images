import dotenv from 'dotenv'
import { app } from './app'
import { closeBrowser, launchBrowser } from './lib/puppeteer'

dotenv.config()
const port = process.env.PORT ?? 4040

const start = async () => {
  await launchBrowser()
  const server = app.listen(port, async () => {
    console.log(`[Echo.images]: is listening on ${port} 🚀`)

    const shutdown = async () => {
      await closeBrowser()
      server?.close(() => {
        console.log(`[Echo.images]: closed ${port} 🖐`)
      })
    }
    process.on('SIGTERM', shutdown)
    process.on('SIGINT', shutdown)
  })
}

start().then()

import dotenv from 'dotenv'
import { app } from './app'

dotenv.config()
const port = process.env.PORT ?? 4040

const start = async () => {
  app.listen(port, () => {
    console.log(`[Echo.images]: is listening on ${port} 🚀`)
  })
}

start().then()

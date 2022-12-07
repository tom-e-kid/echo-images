import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import { imagesRouter } from './routes/api/v1/images'
import { NotFound } from './errors/not-found'
import { errorHandler } from './middlewares/error-handler'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send({ message: 'hello Echo.images ⚡️' })
})

app.use(imagesRouter)

app.all('*', async () => {
  throw new NotFound()
})

app.use(errorHandler)

export { app }

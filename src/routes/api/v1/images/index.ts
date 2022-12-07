import express from 'express'

const router = express.Router()

router.get('/api/v1/images', async (req, res) => {
  res.status(200).send({ message: 'images' })
})

export { router as imagesRouter }

import express from 'express'
import { z } from 'zod'
import { zodValidate } from '../../../../middlewares/zod-validation'
import { querySchema } from '../../../../services/images/schema'
import { generate } from '../../../../services/images/generator'

const router = express.Router()

router.get('/api/v1/images', async (req, res) => {
  const { query: input } = await zodValidate(
    req,
    z.object({ query: querySchema })
  )
  const binary = await generate(input)
  res.setHeader('Content-Type', `image/${input.format}`)
  res.status(200).end(binary, 'binary')
})

export { router as imagesRouter }

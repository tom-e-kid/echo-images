import express, { Request } from 'express'
import { Format, generate } from '../../../../services/images/generator'
import { BadRequest } from '../../../../errors/bad-request'
import { getContrastHex, hexToRGB } from '../../../../utils/color'
import { Types } from '../../../../utils/types'

const router = express.Router()

type queries =
  | 'format'
  | 'width'
  | 'background_color'
  | 'border_color'
  | 'text_color'
  | 'height'
  | 'label'

interface ImageRequest extends Request {
  query: {
    [key in queries]: string
  }
}

const getFormat = (req: ImageRequest) => {
  let f = req.query.format?.toLowerCase()
  if (f) {
    if (f === 'jpg') {
      f = 'jpeg'
    }
    if (!Object.values(Format).includes(f as Format)) {
      throw new BadRequest('Invalid format')
    }
  }
  return (f ?? 'jpeg') as Format
}

const getSize = (req: ImageRequest) => {
  const width = req.query.width ? +req.query.width : 512
  const height = req.query.height ? +req.query.height : width
  if (
    !Types.isNumber(width) ||
    !Types.isNumber(height) ||
    !(width > 0 && width <= 2048) ||
    !(height > 0 && height <= 2048)
  ) {
    throw new BadRequest('Invalid size')
  }
  return { width, height }
}

const getColors = (req: ImageRequest) => {
  //TODO: it would be nice to use random colors if color was undefined
  let background = req.query.background_color ?? '#007aff'
  if (!background.startsWith('#')) {
    background = `#${background}`
  }
  let border = req.query.border_color ?? '#bbb'
  if (!border.startsWith('#')) {
    border = `#${border}`
  }
  let text = req.query.text_color ?? getContrastHex(background)
  if (!text.startsWith('#')) {
    text = `#${text}`
  }
  if (
    (background && !hexToRGB(background)) ||
    (border && !hexToRGB(border)) ||
    (text && !hexToRGB(text))
  ) {
    throw new BadRequest('Invalid colors')
  }
  return { background, border, text }
}

const getLabel = (req: ImageRequest) => {
  return req.query.label?.split('_').join(' ')
}

router.get('/api/v1/images', async (req: ImageRequest, res) => {
  const format = getFormat(req)
  const size = getSize(req)
  const colors = getColors(req)
  const label = getLabel(req)

  const binary = await generate({
    format,
    size,
    colors,
    label,
  })
  res.setHeader('Content-Type', `image/${format}`)
  res.status(200).end(binary, 'binary')
})

export { router as imagesRouter }

import { z } from 'zod'
import { getContrastHex, hexToRGB } from '../../utils/color'
import { Types } from '../../utils/types'

const formats = ['png', 'jpeg'] as const
// export type Formats = typeof formats[number]
const templates = ['legacy'] as const
export type Templates = typeof templates[number]

const hexSchema = z.string().refine(
  (v) => hexToRGB(v.startsWith('#') ? v : `#${v}`),
  (v) => ({ message: `${v} is unexpected color` })
)

const sizeSchema = z
  .string()
  .refine(
    (v) => {
      const n = +v
      return Types.isNumber(n) && n > 0 && n <= 2048
    },
    (v) => ({ message: `${v} is unexpected size` })
  )
  .transform((v) => parseInt(v))

export const querySchema = z
  .object({
    format: z.enum(formats).default(formats[formats.length - 1]),
    width: sizeSchema.default('512'),
    height: sizeSchema.optional(),
    background_color: hexSchema.default('#007aff'),
    border_color: hexSchema.default('#bbbbbb'),
    text_color: hexSchema.optional(),
    label: z
      .string()
      .transform((v) => v.split('_').join(' '))
      .optional(),
    template: z.enum(templates).default(templates[templates.length - 1]),
  })
  .transform((v) => ({
    format: v.format,
    size: {
      width: v.width,
      height: v.height ?? v.width,
    },
    colors: {
      background: v.background_color,
      border: v.border_color,
      text: v.text_color ?? getContrastHex(v.background_color),
    },
    label: v.label,
    template: v.template,
  }))

export type GeneratorInput = z.infer<typeof querySchema>

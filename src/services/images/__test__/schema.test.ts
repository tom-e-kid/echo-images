import { hexSchema, querySchema, sizeSchema } from '../schema'
import { ZodError } from 'zod'
import { getContrastHex } from '../../../utils/color'

describe('parse hex rgb color string', () => {
  it('3 hex characters', () => {
    expect(hexSchema.parse('#f00')).toBe('#f00')
    expect(hexSchema.parse('0f0')).toBe('#0f0')
  })
  it('6 hex characters', () => {
    expect(hexSchema.parse('#eeeeee')).toBe('#eeeeee')
    expect(hexSchema.parse('3333ff')).toBe('#3333ff')
  })
  it('unexpected length of characters', () => {
    expect(() => hexSchema.parse('#12')).toThrowError(ZodError)
    expect(() => hexSchema.parse('#1212')).toThrowError(ZodError)
    expect(() => hexSchema.parse('#12121')).toThrowError(ZodError)
    expect(() => hexSchema.parse('#1212121')).toThrowError(ZodError)
    expect(() => hexSchema.parse('#12121212')).toThrowError(ZodError)
    expect(() => hexSchema.parse('#121212121')).toThrowError(ZodError)
    expect(() => hexSchema.parse('#1212121212')).toThrowError(ZodError)
  })
  it('invalid characters', () => {
    expect(() => hexSchema.parse('#zip')).toThrowError(ZodError)
    expect(() => hexSchema.parse('#welcom')).toThrowError(ZodError)
  })
})

describe('parse size string', () => {
  it('valid number strings 1 ~ 2048', () => {
    expect(sizeSchema.parse('1')).toBe(1)
    expect(sizeSchema.parse('2048')).toBe(2048)
  })
  it('invalid number strings 0 and 2049', () => {
    expect(() => sizeSchema.parse('0')).toThrowError(ZodError)
    expect(() => sizeSchema.parse('2049')).toThrowError(ZodError)
  })
  it('invalid strings', () => {
    expect(() => sizeSchema.parse('a')).toThrowError(ZodError)
    expect(() => sizeSchema.parse('hello')).toThrowError(ZodError)
  })
})

describe('parse query parameters', () => {
  it('set valid format', () => {
    const input = querySchema.parse({ format: 'png' })
    expect(input.format).toBe('png')
  })
  it('set invalid format', () => {
    expect(() => querySchema.parse({ format: 'json' })).toThrowError(ZodError)
  })

  it('set valid width and height', () => {
    const input = querySchema.parse({ width: '1024', height: '2048' })
    expect(input.size.width).toBe(1024)
    expect(input.size.height).toBe(2048)
  })
  it('set width only', () => {
    const input = querySchema.parse({ width: '128' })
    expect(input.size.width).toBe(128)
    expect(input.size.height).toBe(128)
  })
  it('set height only', () => {
    const input = querySchema.parse({ height: '128' })
    expect(input.size.height).toBe(128)
    expect(input.size.width).toBe(512) // must be default value
  })
  it('set invalid width and height', () => {
    expect(() => querySchema.parse({ width: '0' })).toThrowError(ZodError)
    expect(() => querySchema.parse({ height: '2049' })).toThrowError(ZodError)
  })

  it('set valid colors (3 hex chars)', () => {
    const input = querySchema.parse({
      background_color: 'f00',
      border_color: '0f0',
      text_color: '00f',
    })
    expect(input.colors.background).toBe('#f00')
    expect(input.colors.border).toBe('#0f0')
    expect(input.colors.text).toBe('#00f')
  })
  it('set valid colors (6 hex chars)', () => {
    const input = querySchema.parse({
      background_color: 'ff8822',
      border_color: '2288ff',
      text_color: '88ff22',
    })
    expect(input.colors.background).toBe('#ff8822')
    expect(input.colors.border).toBe('#2288ff')
    expect(input.colors.text).toBe('#88ff22')
  })
  it('set invalid colors', () => {
    expect(() => querySchema.parse({ background_color: '0' })).toThrowError(
      ZodError
    )
    expect(() => querySchema.parse({ border_color: 'ffffffff' })).toThrowError(
      ZodError
    )
    expect(() => querySchema.parse({ text_color: 'hello' })).toThrowError(
      ZodError
    )
  })

  it('set valid template', () => {
    const input = querySchema.parse({ template: 'legacy' })
    expect(input.template).toBe('legacy')
  })
  it('set invalid template', () => {
    expect(() => querySchema.parse({ template: 'cool' })).toThrowError(ZodError)
  })
  it('default parameters', () => {
    const input = querySchema.parse({})
    expect(input.format).toBe('jpeg')
    expect(input.size.width).toBe(512)
    expect(input.size.height).toBe(512)
    expect(input.colors.background).toBe('#007aff')
    expect(input.colors.border).toBe('#bbbbbb')
    expect(input.colors.text).toBe(getContrastHex(input.colors.background))
    expect(input.template).toBe('legacy')
  })
})

import { buildTemplate } from '../index'
import { GeneratorInput, Templates, templates } from '../../schema'

describe('template builder', () => {
  const input: GeneratorInput = {
    format: 'png',
    size: {
      width: 256,
      height: 256,
    },
    colors: {
      background: '#f00',
      border: '#0f0',
      text: '#00f',
    },
    label: 'hello',
    template: 'legacy',
  }
  it('pass correct template', async () => {
    for (const v of templates) {
      const html = await buildTemplate(v, input)
      expect(html).toContain(`<title>${v}</title>`)
    }
  })
  it('pass invalid template', async () => {
    const html = await buildTemplate('INVALID' as Templates, input)
    expect(html).toContain(`<title>legacy</title>`)
  })
})

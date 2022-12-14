import { GeneratorInput } from './schema'
import { buildTemplate } from './template'
import { getSinglePage } from '../../lib/puppeteer'

export const generate = async (input: GeneratorInput) => {
  const {
    format,
    size: { width, height },
    template,
  } = input

  const page = await getSinglePage()
  await page.setViewport({ width, height })
  const html = await buildTemplate(template, input)
  await page.setContent(html)
  const snapshot = await page.screenshot(
    format === 'jpeg' ? { type: 'jpeg', quality: 100 } : undefined
  )
  return snapshot
}

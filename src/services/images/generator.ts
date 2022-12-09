import puppeteer from 'puppeteer'
import { GeneratorInput } from './schema'
import { buildTemplate } from './template'

export const generate = async (input: GeneratorInput) => {
  const {
    format,
    size: { width, height },
    template,
  } = input
  const browser = await puppeteer.launch({
    defaultViewport: { width, height },
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: true,
  })

  const html = await buildTemplate(template, input)

  const page = await browser.newPage()
  await page.setContent(html)
  const snapshot = await page.screenshot(
    format === 'jpeg' ? { type: 'jpeg', quality: 80 } : undefined
  )
  await browser.close()
  return snapshot
}

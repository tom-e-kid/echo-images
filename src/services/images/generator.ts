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
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--single-process',
      '--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
    ],
  })
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  const html = await buildTemplate(template, input)
  await page.setContent(html)
  const snapshot = await page.screenshot(
    format === 'jpeg' ? { type: 'jpeg', quality: 80 } : undefined
  )
  await browser.close()
  return snapshot
}

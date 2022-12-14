import puppeteer, { Browser, Page } from 'puppeteer'

let browser: Browser
let page: Page

export const launchBrowser = async () => {
  browser = await puppeteer.launch({
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
}

export const getSinglePage = async () => {
  if (!page) {
    page = await browser.newPage()
  }
  return page
}

export const closeBrowser = async () => {
  await browser.close()
}

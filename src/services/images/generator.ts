import puppeteer from 'puppeteer'
import { GeneratorInput } from './schema'

export const generate = async (input: GeneratorInput) => {
  const {
    format,
    size: { width, height },
    colors,
    label,
  } = input

  const browser = await puppeteer.launch({
    defaultViewport: { width, height },
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: true,
  })

  const content = label
    ? `<div>
        <h1>${label}</h1>
        <p>${width} x ${height}</p>
       </div>`
    : `<div>
        <h1>${width} x ${height}</h1>
       </div>
      `

  const html = `
    <html lang="en">
      <head>
        <style>
        body {
          background-color: ${colors.border};
          padding: 2px;
          margin: 0;
        }
        div {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: ${colors.text};
          background-color: ${colors.background};
        }
        h1 {
          font-family: monospace;
          font-weight: 900;
          font-size: 1.75em;
        }
        p {
          font-family: monospace;
          font-weight: 900;
          font-size: 1.25em;
        }
        </style>
        <title>image</title>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `

  const page = await browser.newPage()
  await page.setContent(html)
  const snapshot = await page.screenshot(
    format === 'jpeg' ? { type: 'jpeg', quality: 50 } : undefined
  )
  await browser.close()
  return snapshot
}

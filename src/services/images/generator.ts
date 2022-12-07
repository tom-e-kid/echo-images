import chromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer'

export const Format = {
  JPEG: 'jpeg',
  PNG: 'png',
} as const

export type Format = typeof Format[keyof typeof Format]

export type Input = {
  format: Format
  size: {
    width: number
    height: number
  }
  colors: {
    background: string
    border: string
    text: string
  }
  label?: string
}

export const generate = async (input: Input) => {
  const {
    format,
    size: { width, height },
    colors,
    label,
  } = input

  const browser = await puppeteer.launch(
    process.env.NODE_ENV === 'production'
      ? {
          args: chromium.args,
          defaultViewport: { width, height },
          executablePath: await chromium.executablePath,
          headless: chromium.headless,
        }
      : { defaultViewport: { width, height } }
  )

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

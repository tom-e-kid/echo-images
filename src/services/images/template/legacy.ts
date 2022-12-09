import { GeneratorInput } from '../schema'

// builder MUST return styled html string that  embedded input values.
// and also you need to include title element with template name in it.

export const builder = async (input: GeneratorInput) => {
  const {
    size: { width, height },
    colors,
    label,
  } = input

  const content = label
    ? `<div>
        <h1>${label}</h1>
        <p>${width} x ${height}</p>
       </div>`
    : `<div>
        <h1>${width} x ${height}</h1>
       </div>
      `

  return `
    <html lang="en">
      <head>
        <title>legacy</title>
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
      </head>
      <body>
        ${content}
      </body>
    </html>
  `
}

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './routes'
import express from 'express'
import path from 'path'

const app = express()

app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('*', (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    const content = renderToString(<RouterContext {...props}/>)
    res.send(renderPage(content))
  })
})

function renderPage(content) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="favicon.ico">
        <title>F3 Nova</title>
        <link rel="stylesheet" href="/${manifest["main.css"]}" />
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/${manifest["main.js"]}"></script>
      </body>
    </html>
  `
}

const port = process.argv[2] || 3000

app.listen(port, function () {
  console.log(`App listening on port ${port}`)
})

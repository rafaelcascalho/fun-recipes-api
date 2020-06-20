import express from 'express'

const app = express()

import { HOST, PORT } from './config/constants'

app.get('/health', (request, response) => {
  return response.json({ status: 'UP' })
})

app.listen(PORT, () =>
  console.log(`> server running at http://${HOST}:${PORT}`)
)

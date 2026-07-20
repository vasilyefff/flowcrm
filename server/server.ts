import express from 'express'

const app = express()
const PORT = 3001

app.get('/', (_request, response) => {
  response.send('FlowCRM server is running')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()

app.use(cors())
app.use(express.json())
const PORT = 3001

const dbFile = fs.readFileSync('db.json', 'utf-8')
const db = JSON.parse(dbFile)

const clients = db.clients
const deals = db.deals

const saveDatabase = () => {
  fs.writeFileSync('db.json', JSON.stringify(db, null, 2))
}

app.get('/clients', (_request, response) => {
  response.json(clients)
})

app.get('/clients/:id', (request, response) => {
  const client = clients.find((client) => client.id === request.params.id)

  if (!client) {
    return response.status(404).json({
      message: 'Client not found',
    })
  }

  response.json(client)
})

app.post('/clients', (request, response) => {
  const newClient = {
    ...request.body,
    id: String(clients.length + 1),
    createdAt: new Date().toISOString(),
  }

  clients.push(newClient)
  saveDatabase()

  response.status(201).json(newClient)
})

app.patch('/clients/:id', (request, response) => {
  const clientIndex = clients.findIndex(
    (client) => client.id === request.params.id,
  )

  if (clientIndex === -1) {
    return response.status(404).json({
      message: 'Client not found',
    })
  }

  const updatedClient = {
    ...clients[clientIndex],
    ...request.body,
  }

  clients[clientIndex] = updatedClient
  saveDatabase()

  response.json(updatedClient)
})

app.delete('/clients/:id', (request, response) => {
  const clientIndex = clients.findIndex(
    (client) => client.id === request.params.id,
  )

  if (clientIndex === -1) {
    return response.status(404).json({
      message: 'Client not found',
    })
  }

  clients.splice(clientIndex, 1)
  saveDatabase()

  response.status(204).send()
})

app.get('/deals', (_request, response) => {
  response.json(deals)
})

app.get('/deals/:id', (request, response) => {
  const deal = deals.find((deal) => deal.id === request.params.id)

  if (!deal) {
    return response.status(404).json({
      message: 'Deal not found',
    })
  }

  response.json(deal)
})

app.post('/deals', (request, response) => {
  const newDeal = {
    ...request.body,
    id: String(deals.length + 1),
    createdAt: new Date().toISOString(),
  }

  deals.push(newDeal)

  response.status(201).json(newDeal)
})

app.patch('/deals/:id', (request, response) => {
  const dealIndex = deals.findIndex((deal) => deal.id === request.params.id)

  if (dealIndex === -1) {
    return response.status(404).json({
      message: 'Deal not found',
    })
  }

  const updatedDeal = {
    ...deals[dealIndex],
    ...request.body,
  }

  deals[dealIndex] = updatedDeal

  response.json(updatedDeal)
})

app.delete('/deals/:id', (request, response) => {
  const dealIndex = deals.findIndex((deal) => deal.id === request.params.id)

  if (dealIndex === -1) {
    return response.status(404).json({
      message: 'Deal not found',
    })
  }

  deals.splice(dealIndex, 1)

  response.status(204).send()
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

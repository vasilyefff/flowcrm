import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
const PORT = 3001

const clients = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 555 123 4567',
    company: 'Nova Labs',
    status: 'active',
    createdAt: '2026-07-20T10:00:00.000Z',
  },
  {
    id: '2',
    name: 'Maria Smith',
    email: 'maria@example.com',
    phone: '+1 555 987 6543',
    company: 'Bright Solutions',
    status: 'lead',
    createdAt: '2026-07-20T10:00:00.000Z',
  },
]

const deals = [
  {
    id: '1',
    title: 'Website redesign',
    clientId: '1',
    value: 12000,
    stage: 'proposal',
    comment: 'Waiting for approval',
    createdAt: '2026-07-20T10:00:00.000Z',
  },
]

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

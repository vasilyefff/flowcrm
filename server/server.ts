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
  const nextId = String(
    Math.max(0, ...clients.map((client) => Number(client.id))) + 1,
  )
  const newClient = {
    ...request.body,
    name: request.body.name.trim(),
    email: request.body.email.trim(),
    phone: request.body.phone.trim(),
    company: request.body.company.trim(),
    id: nextId,
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

  const sanitizedUpdates = {
    ...request.body,
    ...(typeof request.body.name === 'string' && {
      name: request.body.name.trim(),
    }),
    ...(typeof request.body.email === 'string' && {
      email: request.body.email.trim(),
    }),

    ...(typeof request.body.phone === 'string' && {
      phone: request.body.phone.trim(),
    }),

    ...(typeof request.body.company === 'string' && {
      company: request.body.company.trim(),
    }),
  }

  const updatedClient = {
    ...clients[clientIndex],
    ...sanitizedUpdates,
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

  const hasRelatedDeals = deals.some(
    (deal) => deal.clientId === request.params.id,
  )

  if (hasRelatedDeals) {
    return response.status(409).json({
      message: 'Client cannot be deleted because it has related deals',
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
  const nextId = String(
    Math.max(0, ...deals.map((deal) => Number(deal.id))) + 1,
  )
  const newDeal = {
    ...request.body,
    title: request.body.title.trim(),
    comment: request.body.comment.trim(),
    id: nextId,
    createdAt: new Date().toISOString(),
  }

  deals.push(newDeal)
  saveDatabase()

  response.status(201).json(newDeal)
})

app.patch('/deals/:id', (request, response) => {
  const dealIndex = deals.findIndex((deal) => deal.id === request.params.id)

  if (dealIndex === -1) {
    return response.status(404).json({
      message: 'Deal not found',
    })
  }

  const sanitizedUpdates = {
    ...request.body,

    ...(typeof request.body.title === 'string' && {
      title: request.body.title.trim(),
    }),

    ...(typeof request.body.comment === 'string' && {
      comment: request.body.comment.trim(),
    }),
  }

  const updatedDeal = {
    ...deals[dealIndex],
    ...sanitizedUpdates,
  }

  deals[dealIndex] = updatedDeal
  saveDatabase()

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
  saveDatabase()

  response.status(204).send()
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

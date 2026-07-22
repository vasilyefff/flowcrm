import express from 'express'

const app = express()
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
  },
  {
    id: '2',
    name: 'Maria Smith',
    email: 'maria@example.com',
    phone: '+1 555 987 6543',
    company: 'Bright Solutions',
    status: 'lead',
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
    id: String(clients.length + 1),
    ...request.body,
    createdAt: new Date().toISOString(),
  }

  clients.push(newClient)

  response.status(201).json(newClient)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

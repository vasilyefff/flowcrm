import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addClient,
  deleteClient,
  updateClient,
} from '@/entities/client/model/clientSlice'
import type { RootState, AppDispatch } from '@/app/store'
import type { Client } from '@/entities/client/model/types'
import { ClientForm } from '@/features/client/create/ClientForm'

export const ClientsPage = () => {
  const clients = useSelector((state: RootState) => state.clients.items)
  const dispatch = useDispatch<AppDispatch>()

  const [searchTerm, setSearchTerm] = useState('')
  const [editClient, setEditClient] = useState<Client | null>(null)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editCompany, setEditCompany] = useState('')

  const handleDelete = (id: string) => {
    dispatch(deleteClient(id))
  }

  const handleEditStart = (client: Client) => {
    setEditClient(client)
    setEditName(client.name)
    setEditEmail(client.email)
    setEditPhone(client.phone)
    setEditCompany(client.company)
  }

  const handleUpdate = () => {
    if (!editClient) return

    dispatch(
      updateClient({
        ...editClient,
        name: editName,
        email: editEmail,
        phone: editPhone,
        company: editCompany,
      }),
    )

    setEditClient(null)
  }

  const term = searchTerm.toLowerCase()

  const filteredClients = clients.filter((client) => {
    return (
      client.name.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term)
    )
  })

  return (
    <>
      <div>Clients Page</div>

      <div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search clients..."
        />
      </div>

      {editClient && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ marginBottom: 10 }}>Edit Client</h3>

          <div style={{ marginBottom: 8 }}>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Name"
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <input
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <input
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              placeholder="Phone"
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <input
              value={editCompany}
              onChange={(e) => setEditCompany(e.target.value)}
              placeholder="Company"
            />
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditClient(null)}>Cancel</button>
          </div>
        </div>
      )}

      {filteredClients.length === 0 ? (
        <div>No clients found</div>
      ) : (
        filteredClients.map((client) => (
          <div key={client.id}>
            {client.name} - {client.email} - {client.phone} - {client.company} -{' '}
            {client.status}
            <button onClick={() => handleDelete(client.id)}>Delete</button>
            <button onClick={() => handleEditStart(client)}>Edit</button>
          </div>
        ))
      )}

      <ClientForm onSubmit={(data) => dispatch(addClient(data))} />
    </>
  )
}

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
import { ClientList } from '@/entities/client/ui/ClientList'

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
    const values = [
      client.name,
      client.email,
      client.company,
      String(client.phone),
    ]

    return values.some((value) => value.toLowerCase().includes(term))
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

      <ClientList clients={filteredClients} onDelete={handleDelete} />

      <ClientForm onSubmit={(data) => dispatch(addClient(data))} />
    </>
  )
}

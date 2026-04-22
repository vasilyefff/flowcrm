import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addClient,
  deleteClient,
  updateClient,
} from '@/entities/client/model/clientSlice'
import type { RootState, AppDispatch } from '@/app/store'
import type { Client } from '@/entities/client/model/types'
import type { CreateClientDto } from '@/entities/client/model/types'
import { ClientForm } from '@/features/client/create/ClientForm'
import { ClientList } from '@/entities/client/ui/ClientList'

export const ClientsPage = () => {
  const clients = useSelector((state: RootState) => state.clients.items)
  const dispatch = useDispatch<AppDispatch>()

  const [searchTerm, setSearchTerm] = useState('')
  const [editClient, setEditClient] = useState<Client | null>(null)

  const handleDelete = (id: string) => {
    dispatch(deleteClient(id))

    if (editClient?.id === id) {
      setEditClient(null)
    }
  }

  const handleUpdate = (data: CreateClientDto) => {
    if (!editClient) return

    dispatch(
      updateClient({
        ...editClient,
        ...data,
      }),
    )

    setEditClient(null)
  }

  const handleEdit = (client: Client) => {
    setEditClient(client)
  }

  const handleCancel = () => {
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

  const overlayStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const modalStyle = {
    background: 'white',
    padding: 20,
    borderRadius: 8,
    minWidth: 300,
  }

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
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <ClientForm
              onSubmit={handleUpdate}
              initialData={editClient}
              isEdit
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      <ClientList
        clients={filteredClients}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <ClientForm onSubmit={(data) => dispatch(addClient(data))} />
    </>
  )
}

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
import { Modal } from '@/shared/ui/Modal'

export const ClientsPage = () => {
  const clients = useSelector((state: RootState) => state.clients.items)
  const dispatch = useDispatch<AppDispatch>()

  const [searchTerm, setSearchTerm] = useState('')
  const [editClient, setEditClient] = useState<Client | null>(null)
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleDelete = (client: Client) => {
    setClientToDelete(client)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!clientToDelete) return

    dispatch(deleteClient(clientToDelete.id))

    if (editClient?.id === clientToDelete.id) {
      setEditClient(null)
    }
    setClientToDelete(null)
    setIsDeleteModalOpen(false)
  }

  const handleCancelDelete = () => {
    setClientToDelete(null)
    setIsDeleteModalOpen(false)
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

      <Modal isOpen={!!editClient} onClose={handleCancel}>
        <ClientForm
          onSubmit={handleUpdate}
          initialData={editClient ?? undefined}
          isEdit
          onCancel={handleCancel}
        />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={handleCancelDelete}>
        <div>
          <h3>Delete client?</h3>
          <p>
            {clientToDelete?.name
              ? `Are you sure you want to delete ${clientToDelete.name}?`
              : 'Are you sure?'}
          </p>

          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            <button onClick={handleConfirmDelete}>Delete</button>
            <button onClick={handleCancelDelete}>Cancel</button>
          </div>
        </div>
      </Modal>

      <ClientList
        clients={filteredClients}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <ClientForm onSubmit={(data) => dispatch(addClient(data))} />
    </>
  )
}

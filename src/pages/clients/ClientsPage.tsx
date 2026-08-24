import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  createClient,
  deleteClientRequest,
  fetchClients,
  updateClientRequest,
} from '@/entities/client/model/clientSlice'
import type { RootState, AppDispatch } from '@/app/store'
import type {
  Client,
  CreateClientDto,
  UpdateClientDto,
} from '@/entities/client/model/types'
import type { ClientStatus } from '@/entities/client/model/types'
import { ClientForm } from '@/features/client/create/ClientForm'
import { ClientList } from '@/entities/client/ui/ClientList'
import { DeleteClientDialog } from '@/features/client/delete/DeleteClientDialog'
import { EditClientDialog } from '@/features/client/edit/EditClientDialog'

export const ClientsPage = () => {
  const clients = useSelector((state: RootState) => state.clients.items)
  const error = useSelector((state: RootState) => state.clients.error)
  const fetchStatus = useSelector(
    (state: RootState) => state.clients.fetchStatus,
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchClients())
  }, [dispatch])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | ClientStatus>('all')
  const [editClient, setEditClient] = useState<Client | null>(null)
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleCreate = (data: CreateClientDto) => {
    dispatch(createClient(data))
  }

  const handleDelete = (client: Client) => {
    setClientToDelete(client)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!clientToDelete) return

    dispatch(deleteClientRequest(clientToDelete.id))

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

  const handleUpdate = (data: UpdateClientDto) => {
    if (!editClient) return

    dispatch(
      updateClientRequest({
        id: editClient.id,
        clientData: data,
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

    const searchMatch = values.some((value) =>
      value.toLowerCase().includes(term),
    )
    const statusMatch = statusFilter === 'all' || client.status === statusFilter

    return searchMatch && statusMatch
  })

  return (
    <>
      <div>Clients Page</div>
      {fetchStatus === 'loading' && <p>Loading clients...</p>}
      {error && <p>{error}</p>}
      <div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search clients..."
        />
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as 'all' | ClientStatus)
          }
        >
          <option value="all">All</option>
          <option value="lead">Lead</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <EditClientDialog
        isOpen={!!editClient}
        client={editClient}
        onSubmit={handleUpdate}
        onCancel={handleCancel}
      />

      <DeleteClientDialog
        isOpen={isDeleteModalOpen}
        client={clientToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {fetchStatus === 'succeeded' && (
        <ClientList
          clients={filteredClients}
          onDelete={handleDelete}
          onEdit={handleEdit}
          hasClients={clients.length > 0}
        />
      )}

      <ClientForm onSubmit={handleCreate} />
    </>
  )
}

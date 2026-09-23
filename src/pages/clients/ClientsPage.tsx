import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  clearClientError,
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
import { Input } from '@/shared/ui/Input'
import { Select } from '@/shared/ui/Select'
import { ScrollablePanel } from '@/shared/ui/ScrollablePanel'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'

export const ClientsPage = () => {
  const clients = useSelector((state: RootState) => state.clients.items)
  const error = useSelector((state: RootState) => state.clients.error)
  const fetchStatus = useSelector(
    (state: RootState) => state.clients.fetchStatus,
  )

  const dispatch = useDispatch<AppDispatch>()

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | ClientStatus>('all')
  const [editClient, setEditClient] = useState<Client | null>(null)
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    dispatch(fetchClients())
  }, [dispatch])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1280px)')

    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsCreateModalOpen(false)
      }
    }

    mediaQuery.addEventListener('change', handleDesktopChange)

    return () => {
      mediaQuery.removeEventListener('change', handleDesktopChange)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleCreate = async (data: CreateClientDto) => {
    await dispatch(createClient(data)).unwrap()
    setIsCreateModalOpen(false)
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
    <div>
      <div className="sticky top-[52px] z-20 mb-6 bg-gray-100 pb-4 md:static md:bg-transparent md:pb-0">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900">Clients</h1>

          <p className="text-sm text-slate-500">
            Manage your customer relationships
          </p>
        </div>

        <div className="mt-4 flex gap-3">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clients..."
          />

          <Select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as 'all' | ClientStatus)
            }
          >
            <option value="all">All</option>
            <option value="lead">Lead</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
        </div>
      </div>

      <div className="fixed right-4 bottom-8 z-40 flex flex-col items-end gap-10 xl:hidden">
        {showBackToTop && (
          <button
            type="button"
            aria-label="Back to top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-700 text-lg text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800"
          >
            ↑
          </button>
        )}

        <div className="shadow-xl shadow-slate-900/20">
          <Button
            type="button"
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create client
          </Button>
        </div>
      </div>

      {fetchStatus === 'loading' && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-sm">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
          <p>Loading clients...</p>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="relative mb-6 max-w-xl rounded-xl border border-red-200 bg-red-50 p-4 pr-12 text-sm text-red-700 shadow-sm"
        >
          <button
            type="button"
            aria-label="Close error"
            onClick={() => dispatch(clearClientError())}
            className="absolute right-3 top-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-xl font-semibold leading-none text-red-500 transition hover:bg-red-100 hover:text-red-700"
          >
            ×
          </button>

          <p className="font-medium text-red-800">Something went wrong</p>
          <p className="mt-1">{error}</p>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-4">
          {fetchStatus === 'succeeded' && (
            <ScrollablePanel>
              <ClientList
                clients={filteredClients}
                onDelete={handleDelete}
                onEdit={handleEdit}
                hasClients={clients.length > 0}
              />
            </ScrollablePanel>
          )}
        </div>

        <div className="hidden xl:block">
          <ClientForm onSubmit={handleCreate} />
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <ClientForm
          onSubmit={handleCreate}
          embedded
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

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
    </div>
  )
}

import type { Client } from '@/entities/client/model/types'
import { ClientCard } from './ClientCard'
import { EmptyState } from '@/shared/ui/EmptyState'

type ClientListProps = {
  clients: Client[]
  onDelete: (client: Client) => void
  onEdit: (client: Client) => void
  hasClients: boolean
}

export const ClientList = ({
  clients,
  onDelete,
  onEdit,
  hasClients,
}: ClientListProps) => {
  if (clients.length === 0) {
    return (
      <EmptyState
        title={hasClients ? 'No results found' : 'No clients yet'}
        description={
          hasClients
            ? 'Try changing your search or filters.'
            : 'Create your first client to get started.'
        }
      />
    )
  }

  return (
    <div>
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

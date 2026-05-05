import type { Client } from '@/entities/client/model/types'
import { ClientCard } from './ClientCard'

type ClientListProps = {
  clients: Client[]
  onDelete: (id: string) => void
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
    return <div>{hasClients ? 'No results found' : 'No clients yet'}</div>
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

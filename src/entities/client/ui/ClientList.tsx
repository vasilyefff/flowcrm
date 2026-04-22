import type { Client } from '@/model/types'
import { ClientCard } from './ClientCard'

type ClientListProps = {
  clients: Client[]
  onDelete: (id: string) => void
  onEdit: (client: Client) => void
}

export const ClientList = ({ clients, onDelete, onEdit }: ClientListProps) => {
  if (clients.length === 0) {
    return <div>No clients found</div>
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

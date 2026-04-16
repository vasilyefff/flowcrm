import type { Client } from '../model/types'

type ClientListProps = {
  clients: Client[]
  onDelete: (id: string) => void
}

export const ClientList = ({ clients, onDelete }: ClientListProps) => {
  if (clients.length === 0) {
    return <div>No clients found</div>
  }

  return (
    <div>
      {clients.map((client) => (
        <div key={client.id}>
          {client.name} - {client.email} - {client.phone} - {client.company} -{' '}
          {client.status}
          <button onClick={() => onDelete(client.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

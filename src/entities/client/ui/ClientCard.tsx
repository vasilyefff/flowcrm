import type { Client } from '@/entities/client/model/types'

type ClientCardProps = {
  client: Client
  onDelete: (id: string) => void
  onEdit: (client: Client) => void
}

export const ClientCard = ({ client, onDelete, onEdit }: ClientCardProps) => {
  return (
    <div>
      {client.name} - {client.email} - {client.phone} - {client.company} -{' '}
      {client.status}
      <button onClick={() => onDelete(client.id)}>Delete</button>
      <button onClick={() => onEdit(client)}>Edit</button>
    </div>
  )
}

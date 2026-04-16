import type { Client } from '../model/types'

type ClientCardProps = {
  client: Client
  onDelete: (id: string) => void
}

export const ClientCard = ({ client, onDelete }: ClientCardProps) => {
  return (
    <div>
      {client.name} - {client.email} - {client.phone} - {client.company} -{' '}
      {client.status}
      <button onClick={() => onDelete(client.id)}>Delete</button>
    </div>
  )
}

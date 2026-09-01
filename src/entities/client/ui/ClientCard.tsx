import { Link } from 'react-router-dom'
import type { Client } from '@/entities/client/model/types'
import { Badge } from '@/shared/ui/Badge'
import { Button } from '@/shared/ui/Button'

type ClientCardProps = {
  client: Client
  onDelete: (client: Client) => void
  onEdit: (client: Client) => void
}

export const ClientCard = ({ client, onDelete, onEdit }: ClientCardProps) => {
  return (
    <div>
      {client.name} - {client.email} - {client.phone} - {client.company} -{' '}
      <Badge variant={client.status}>{client.status}</Badge>
      <div className="flex items-center gap-2">
        <Button variant="danger" onClick={() => onDelete(client)}>
          Delete
        </Button>

        <Button variant="secondary" onClick={() => onEdit(client)}>
          Edit
        </Button>

        <Link to={`/clients/${client.id}`}>Details</Link>
      </div>
    </div>
  )
}

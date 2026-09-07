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
    <div className="grid grid-cols-[1.4fr_1.8fr_1.2fr_0.7fr_1fr] items-center gap-4 border-b border-slate-200 px-4 py-4">
      <div>
        <p className="font-medium text-slate-900">{client.name}</p>
      </div>

      <div className="text-sm text-slate-500">
        <p>{client.email}</p>
        <p>{client.phone}</p>
      </div>

      <div className="text-sm text-slate-700">{client.company}</div>

      <div className="flex">
        <Badge variant={client.status}>{client.status}</Badge>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button variant="danger" onClick={() => onDelete(client)}>
          Delete
        </Button>

        <Button variant="secondary" onClick={() => onEdit(client)}>
          Edit
        </Button>

        <Link
          to={`/clients/${client.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Details
        </Link>
      </div>
    </div>
  )
}

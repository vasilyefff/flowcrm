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
    <div className="border-b border-slate-200 px-4 py-4 md:grid md:grid-cols-[1.4fr_1.8fr_1.2fr_0.7fr_1fr] md:items-center md:gap-4">
      <div className="mb-3 flex items-center justify-between md:mb-0 md:block">
        <p className="font-medium text-slate-900">{client.name}</p>

        <div className="md:hidden">
          <Badge variant={client.status}>{client.status}</Badge>
        </div>
      </div>

      <div className="mb-3 text-sm text-slate-500 md:mb-0">
        <p>{client.email}</p>
        <p>{client.phone}</p>
      </div>

      <div className="mb-3 text-sm text-slate-700 md:mb-0">
        {client.company}
      </div>

      <div className="hidden md:flex">
        <Badge variant={client.status}>{client.status}</Badge>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Link
          to={`/clients/${client.id}`}
          className="flex w-20 items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Details
        </Link>

        <Button
          variant="secondary"
          className="w-20"
          onClick={() => onEdit(client)}
        >
          Edit
        </Button>

        <Button
          variant="danger"
          className="w-20"
          onClick={() => onDelete(client)}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

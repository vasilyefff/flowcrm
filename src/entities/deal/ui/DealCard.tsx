import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store'
import type { Deal } from '@/entities/deal/model/types'

import { Button } from '@/shared/ui/Button'
import { Badge } from '@/shared/ui/Badge'

type DealCardProps = {
  deal: Deal
  onEdit: (deal: Deal) => void
  onDelete: (id: string) => void
}

export const DealCard = ({ deal, onEdit, onDelete }: DealCardProps) => {
  const clients = useSelector((state: RootState) => state.clients.items)
  const client = clients.find((client) => client.id === deal.clientId)
  return (
    <div className="mb-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{deal.title}</h3>

      <div className="mt-2 flex items-center gap-6">
        <p className="text-sm text-slate-600">
          Client:{' '}
          <span className="font-medium text-slate-900">
            {client?.name || 'Client not found'}
          </span>
        </p>

        <p className="text-sm text-slate-600">
          Value:{' '}
          <span className="font-medium text-slate-900">{deal.value}</span>
        </p>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-sm text-slate-600">Stage:</span>

        <Badge variant={deal.stage === 'lead' ? 'dealLead' : deal.stage}>
          {deal.stage}
        </Badge>
      </div>

      <p className="mt-2 text-sm text-slate-600">
        Comment:{' '}
        <span className="text-slate-900">{deal.comment || 'No comment'}</span>
      </p>

      <div className="mt-4 flex gap-2">
        <Button variant="secondary" type="button" onClick={() => onEdit(deal)}>
          Edit
        </Button>

        <Button
          variant="danger"
          type="button"
          onClick={() => onDelete(deal.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

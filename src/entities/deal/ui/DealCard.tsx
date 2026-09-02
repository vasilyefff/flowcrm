import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store'
import type { Deal } from '@/entities/deal/model/types'

import { Button } from '@/shared/ui/Button'

type DealCardProps = {
  deal: Deal
  onEdit: (deal: Deal) => void
  onDelete: (id: string) => void
}

export const DealCard = ({ deal, onEdit, onDelete }: DealCardProps) => {
  const clients = useSelector((state: RootState) => state.clients.items)
  const client = clients.find((client) => client.id === deal.clientId)
  return (
    <div className="mb-3 rounded-lg border border-gray-200 bg-white p-4">
      <h3>{deal.title}</h3>
      <p>Value: {deal.value}</p>
      <p>Stage: {deal.stage}</p>
      <p>Comment: {deal.comment || 'No comment'}</p>
      <p>Client: {client?.name || 'Client not found'}</p>
      <div className="mt-3 flex gap-2">
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

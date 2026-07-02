import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store'
import type { Deal } from '@/entities/deal/model/types'

type DealCardProps = {
  deal: Deal
}

export const DealCard = ({ deal }: DealCardProps) => {
  const clients = useSelector((state: RootState) => state.clients.items)
  const client = clients.find((client) => client.id === deal.clientId)
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '12px',
      }}
    >
      <h3>{deal.title}</h3>
      <p>Value: {deal.value}</p>
      <p>Stage: {deal.stage}</p>
      <p>Comment: {deal.comment || 'No comment'}</p>
      <p>Client: {client?.name || 'Client not found'}</p>
    </div>
  )
}

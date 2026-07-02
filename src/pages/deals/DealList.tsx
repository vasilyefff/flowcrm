import { DealCard } from './DealCard'
import type { Deal } from '@/entities/deal/model/types'

type DealListProps = {
  deals: Deal[]
  onEdit: (deal: Deal) => void
}

export const DealList = ({ deals, onEdit }: DealListProps) => (
  <>
    {deals.map((deal) => (
      <DealCard key={deal.id} deal={deal} onEdit={onEdit} />
    ))}
  </>
)

import { DealCard } from './DealCard'
import { EmptyState } from '@/shared/ui/EmptyState'
import type { Deal } from '@/entities/deal/model/types'

type DealListProps = {
  deals: Deal[]
  onEdit: (deal: Deal) => void
  onDelete: (id: string) => void
  hasDeals: boolean
}

export const DealList = ({
  deals,
  onEdit,
  onDelete,
  hasDeals,
}: DealListProps) => {
  if (deals.length === 0) {
    return (
      <EmptyState
        title={hasDeals ? 'No results found' : 'No deals yet'}
        description={
          hasDeals
            ? 'Try changing your stage filter.'
            : 'Create your first deal to start tracking sales.'
        }
      />
    )
  }

  return (
    <>
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          deal={deal}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  )
}

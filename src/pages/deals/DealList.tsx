import { DealCard } from './DealCard'
import type { Deal } from '@/entities/deal/model/types'

type DealListProps = {
  deals: Deal[]
}

export const DealList = ({ deals }: DealListProps) => (
  <>
    {deals.map((deal) => (
      <DealCard key={deal.id} deal={deal} />
    ))}
  </>
)

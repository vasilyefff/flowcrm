import { DealCard } from './DealCard'
import type { Deal } from '@/entities/deal/model/types'

type DealListProps = {
  deals: Deal[]
}

export const DealList = ({ deals }: DealListProps) => (
  <>
    {deals.map((item) => (
      <DealCard key={item.id} deal={item} />
    ))}
  </>
)

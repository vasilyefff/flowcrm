import { DealCard } from './DealCard'

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

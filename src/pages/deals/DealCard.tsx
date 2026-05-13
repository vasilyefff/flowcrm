import type { Deal } from '@/entities/deal/model/types'

type DealCardProps = {
  deal: Deal
}

export const DealCard = ({ deal }: DealCardProps) => {
  return <div>{deal.title}</div>
}

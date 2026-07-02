import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from '@/app/store'
import { addDeal } from '@/entities/deal/model/dealSlice'
import type { CreateDealDto } from '@/entities/deal/model/types'
import { DealForm } from '@/features/deal/create/DealForm'

import { DealList } from './DealList'

export const DealsPage = () => {
  const deals = useSelector((state: RootState) => state.deals.items)

  const dispatch = useDispatch()

  const handleCreateDeal = (data: CreateDealDto) => {
    dispatch(addDeal(data))
  }

  return (
    <div>
      <h1>Deals</h1>
      <p>Total deals: {deals.length}</p>

      <DealForm onSubmit={handleCreateDeal} />

      <DealList deals={deals} />
    </div>
  )
}

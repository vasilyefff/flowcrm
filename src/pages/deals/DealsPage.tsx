import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from '@/app/store'
import { addDeal, updateDeal } from '@/entities/deal/model/dealSlice'
import type { CreateDealDto, Deal } from '@/entities/deal/model/types'
import { DealForm } from '@/features/deal/create/DealForm'

import { DealList } from './DealList'

export const DealsPage = () => {
  const deals = useSelector((state: RootState) => state.deals.items)
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)

  const dispatch = useDispatch()

  const handleCreateDeal = (data: CreateDealDto) => {
    dispatch(addDeal(data))
  }

  const handleEditDeal = (deal: Deal) => {
    setSelectedDeal(deal)
  }

  const handleUpdateDeal = (data: CreateDealDto) => {
    if (!selectedDeal) return

    dispatch(
      updateDeal({
        ...selectedDeal,
        ...data,
      }),
    )

    setSelectedDeal(null)
  }

  return (
    <div>
      <h1>Deals</h1>
      <p>Total deals: {deals.length}</p>

      <DealForm onSubmit={handleCreateDeal} />

      {selectedDeal && (
        <DealForm
          onSubmit={handleUpdateDeal}
          initialData={selectedDeal}
          isEdit
        />
      )}

      <DealList deals={deals} onEdit={handleEditDeal} />
    </div>
  )
}

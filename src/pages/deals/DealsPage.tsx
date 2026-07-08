import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from '@/app/store'
import { addDeal, updateDeal } from '@/entities/deal/model/dealSlice'
import type { CreateDealDto, Deal } from '@/entities/deal/model/types'
import { DealForm } from '@/features/deal/create/DealForm'
import { EditDealDialog } from '@/features/deal/edit/EditDealDialog'

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

  const handleUpdateDeal = (dealId: string, data: CreateDealDto) => {
    const dealToUpdate = deals.find((deal) => deal.id === dealId)

    if (!dealToUpdate) return

    dispatch(
      updateDeal({
        ...dealToUpdate,
        ...data,
      }),
    )

    setSelectedDeal(null)
  }

  const handleCancelEdit = () => {
    setSelectedDeal(null)
  }

  return (
    <div>
      <h1>Deals</h1>
      <p>Total deals: {deals.length}</p>

      <DealForm onSubmit={handleCreateDeal} />

      <EditDealDialog
        deal={selectedDeal}
        onSubmit={handleUpdateDeal}
        onCancel={handleCancelEdit}
      />

      <DealList deals={deals} onEdit={handleEditDeal} />
    </div>
  )
}

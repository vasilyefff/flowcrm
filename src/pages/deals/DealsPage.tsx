import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from '@/app/store'
import {
  addDeal,
  deleteDeal,
  updateDeal,
} from '@/entities/deal/model/dealSlice'
import type {
  CreateDealDto,
  Deal,
  DealStage,
} from '@/entities/deal/model/types'
import { DealForm } from '@/features/deal/create/DealForm'
import { EditDealDialog } from '@/features/deal/edit/EditDealDialog'
import { DeleteDealDialog } from '@/features/deal/delete/DeleteDealDialog'

import { DealList } from '@/entities/deal/ui/DealList'

type DealStageFilter = DealStage | 'all'

export const DealsPage = () => {
  const deals = useSelector((state: RootState) => state.deals.items)
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [dealToDelete, setDealToDelete] = useState<Deal | null>(null)
  const [stageFilter, setStageFilter] = useState<DealStageFilter>('all')

  const dispatch = useDispatch()

  const handleCreateDeal = (data: CreateDealDto) => {
    dispatch(addDeal(data))
  }

  const handleEditDeal = (deal: Deal) => {
    setSelectedDeal(deal)
  }

  const handleDeleteDeal = (dealId: string) => {
    const deal = deals.find((deal) => deal.id === dealId)
    if (!deal) return
    setDealToDelete(deal)
  }

  const handleConfirmDelete = () => {
    if (!dealToDelete) return

    dispatch(deleteDeal(dealToDelete.id))
    setDealToDelete(null)
  }

  const handleCancelDelete = () => {
    setDealToDelete(null)
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

  const filteredDeals =
    stageFilter === 'all'
      ? deals
      : deals.filter((deal) => deal.stage === stageFilter)

  const handleCancelEdit = () => {
    setSelectedDeal(null)
  }

  return (
    <div>
      <h1>Deals</h1>
      <p>Total deals: {deals.length}</p>
      <label>
        Filter by stage:
        <select
          value={stageFilter}
          onChange={(event) =>
            setStageFilter(event.target.value as DealStageFilter)
          }
        >
          <option value="all">All</option>
          <option value="lead">Lead</option>
          <option value="negotiation">Negotiation</option>
          <option value="proposal">Proposal</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </label>

      <DealForm onSubmit={handleCreateDeal} />

      <EditDealDialog
        deal={selectedDeal}
        onSubmit={handleUpdateDeal}
        onCancel={handleCancelEdit}
      />

      <DeleteDealDialog
        isOpen={Boolean(dealToDelete)}
        deal={dealToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <DealList
        deals={filteredDeals}
        onEdit={handleEditDeal}
        onDelete={handleDeleteDeal}
      />
    </div>
  )
}

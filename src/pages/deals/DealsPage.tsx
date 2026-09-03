import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import type { AppDispatch, RootState } from '@/app/store'

import {
  createDealRequest,
  deleteDealRequest,
  fetchDeals,
  updateDealRequest,
} from '@/entities/deal/model/dealSlice'

import { fetchClients } from '@/entities/client/model/clientSlice'

import type {
  CreateDealDto,
  Deal,
  DealStage,
} from '@/entities/deal/model/types'

import { DealForm } from '@/features/deal/create/DealForm'
import { EditDealDialog } from '@/features/deal/edit/EditDealDialog'
import { DeleteDealDialog } from '@/features/deal/delete/DeleteDealDialog'
import { DealList } from '@/entities/deal/ui/DealList'
import { Select } from '@/shared/ui/Select'

type DealStageFilter = DealStage | 'all'

export const DealsPage = () => {
  const deals = useSelector((state: RootState) => state.deals.items)
  const fetchStatus = useSelector((state: RootState) => state.deals.fetchStatus)
  const error = useSelector((state: RootState) => state.deals.error)
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [dealToDelete, setDealToDelete] = useState<Deal | null>(null)
  const [stageFilter, setStageFilter] = useState<DealStageFilter>('all')

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchDeals())
    dispatch(fetchClients())
  }, [dispatch])

  const handleCreateDeal = (data: CreateDealDto) => {
    dispatch(createDealRequest(data))
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

    dispatch(deleteDealRequest(dealToDelete.id))
    setDealToDelete(null)
  }

  const handleCancelDelete = () => {
    setDealToDelete(null)
  }

  const handleUpdateDeal = (dealId: string, data: CreateDealDto) => {
    dispatch(
      updateDealRequest({
        id: dealId,
        dealData: data,
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
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Deals</h1>

        {fetchStatus === 'succeeded' && (
          <p className="mt-1 text-sm text-slate-500">
            Total deals: {deals.length}
          </p>
        )}
      </div>
      <div className="mb-6 flex max-w-xs flex-col gap-1.5">
        <label
          htmlFor="deal-stage-filter"
          className="text-sm font-medium text-slate-700"
        >
          Filter by stage
        </label>

        <Select
          id="deal-stage-filter"
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
        </Select>
      </div>

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

      {fetchStatus === 'loading' && <p>Loading deals...</p>}
      {fetchStatus === 'failed' && <p>{error}</p>}

      {fetchStatus === 'succeeded' && (
        <div className="mt-6 max-w-md">
          <DealList
            deals={filteredDeals}
            onEdit={handleEditDeal}
            onDelete={handleDeleteDeal}
            hasDeals={deals.length > 0}
          />
        </div>
      )}
    </div>
  )
}

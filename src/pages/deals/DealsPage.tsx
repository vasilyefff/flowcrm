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
import { ScrollablePanel } from '@/shared/ui/ScrollablePanel'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'

type DealStageFilter = DealStage | 'all'

export const DealsPage = () => {
  const deals = useSelector((state: RootState) => state.deals.items)
  const fetchStatus = useSelector((state: RootState) => state.deals.fetchStatus)
  const error = useSelector((state: RootState) => state.deals.error)

  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [dealToDelete, setDealToDelete] = useState<Deal | null>(null)
  const [stageFilter, setStageFilter] = useState<DealStageFilter>('all')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchDeals())
    dispatch(fetchClients())
  }, [dispatch])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleCreateDeal = async (data: CreateDealDto) => {
    await dispatch(createDealRequest(data)).unwrap()

    setIsCreateModalOpen(false)
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
    <div>
      <div className="sticky top-[52px] z-20 mb-6 bg-gray-100 pb-4 md:static md:bg-transparent md:pb-0">
        <h1 className="text-2xl font-semibold text-slate-900">Deals</h1>

        {fetchStatus === 'succeeded' && (
          <p className="mt-1 text-sm text-slate-500">
            Total deals: {deals.length}
          </p>
        )}

        <div className="mt-4 flex max-w-xs flex-col gap-1.5">
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
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <div className="space-y-6">
          <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-10 lg:hidden">
            {showBackToTop && (
              <button
                type="button"
                aria-label="Back to top"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  })
                }
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-700 text-lg text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800"
              >
                ↑
              </button>
            )}

            <div className="shadow-xl shadow-slate-900/20">
              <Button
                type="button"
                variant="primary"
                onClick={() => setIsCreateModalOpen(true)}
              >
                Create deal
              </Button>
            </div>
          </div>

          {fetchStatus === 'loading' && (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-sm">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
              <p>Loading deals...</p>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <p className="font-medium text-red-800">Something went wrong</p>
              <p className="mt-1">{error}</p>
            </div>
          )}

          {fetchStatus === 'succeeded' && (
            <ScrollablePanel>
              <DealList
                deals={filteredDeals}
                onEdit={handleEditDeal}
                onDelete={handleDeleteDeal}
                hasDeals={deals.length > 0}
              />
            </ScrollablePanel>
          )}
        </div>
        <div className="hidden lg:block">
          <DealForm onSubmit={handleCreateDeal} />
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <DealForm
          onSubmit={handleCreateDeal}
          embedded
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

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
    </div>
  )
}

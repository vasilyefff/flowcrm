import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/app/store'

import { fetchClients } from '@/entities/client/model/clientSlice'
import { fetchDeals } from '@/entities/deal/model/dealSlice'

import { Badge } from '@/shared/ui/Badge'
import { EmptyState } from '@/shared/ui/EmptyState'

export const ClientDetailsPage = () => {
  const { clientId } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const clients = useSelector((state: RootState) => state.clients.items)
  const fetchStatus = useSelector(
    (state: RootState) => state.clients.fetchStatus,
  )
  const error = useSelector((state: RootState) => state.clients.error)
  const client = clients.find((client) => client.id === clientId)

  const deals = useSelector((state: RootState) => state.deals.items)
  const clientDeals = deals.filter((deal) => deal.clientId === clientId)

  useEffect(() => {
    dispatch(fetchClients())
    dispatch(fetchDeals())
  }, [dispatch])

  if (fetchStatus === 'loading' || fetchStatus === 'idle') {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-sm">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
        <p>Loading client...</p>
      </div>
    )
  }

  if (fetchStatus === 'failed') {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
      >
        <p className="font-medium text-red-800">Something went wrong</p>
        <p className="mt-1">{error}</p>
      </div>
    )
  }

  if (!client) {
    return (
      <EmptyState
        title="Client not found"
        description="The client you are looking for does not exist."
      />
    )
  }

  return (
    <div className="space-y-6">
      <Link
        to="/clients"
        className="inline-flex text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        ← Back to clients
      </Link>
      <div className="flex items-start gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {client.name}
          </h1>

          <p className="mt-1 text-sm text-slate-500">Client details</p>
        </div>

        <Badge variant={client.status}>{client.status}</Badge>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Client information
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="mt-1 font-medium text-slate-900">{client.email}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Phone</p>
            <p className="mt-1 font-medium text-slate-900">{client.phone}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Company</p>
            <p className="mt-1 font-medium text-slate-900">{client.company}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Created</p>
            <p className="mt-1 font-medium text-slate-900">
              {new Date(client.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold text-slate-900">
          Related deals
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {clientDeals.length} deals connected to this client
        </p>
      </div>

      {clientDeals.length === 0 ? (
        <p className="text-sm text-slate-500">This client has no deals yet.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {clientDeals.map((deal) => (
            <div
              key={deal.id}
              className="border-b border-slate-100 p-4 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <p className="font-medium text-slate-900">{deal.title}</p>

                <Badge
                  variant={deal.stage === 'lead' ? 'dealLead' : deal.stage}
                >
                  {deal.stage}
                </Badge>
              </div>

              <p className="mt-1 text-sm text-slate-500">Value: {deal.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

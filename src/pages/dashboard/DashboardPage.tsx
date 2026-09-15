import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import type { AppDispatch, RootState } from '@/app/store'

import { fetchClients } from '@/entities/client/model/clientSlice'
import { fetchDeals } from '@/entities/deal/model/dealSlice'

import { StatCard } from '@/shared/ui/StatCard'
import { Badge } from '@/shared/ui/Badge'

export const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const clients = useSelector((state: RootState) => state.clients.items)
  const deals = useSelector((state: RootState) => state.deals.items)

  useEffect(() => {
    dispatch(fetchClients())
    dispatch(fetchDeals())
  }, [dispatch])

  const totalClients = clients.length

  const activeDeals = deals.filter(
    (deal) => deal.stage !== 'won' && deal.stage !== 'lost',
  ).length

  const wonRevenue = deals
    .filter((deal) => deal.stage === 'won')
    .reduce((total, deal) => total + deal.value, 0)

  const leads = clients.filter((client) => client.status === 'lead').length

  const leadClients = clients.filter((client) => client.status === 'lead')

  const latestDeals = [...deals]
    .sort(
      (firstDeal, secondDeal) =>
        new Date(secondDeal.createdAt).getTime() -
        new Date(firstDeal.createdAt).getTime(),
    )
    .slice(0, 5)

  const dealsByStage = deals.reduce(
    (stages, deal) => {
      stages[deal.stage] += 1

      return stages
    },
    {
      lead: 0,
      proposal: 0,
      negotiation: 0,
      won: 0,
      lost: 0,
    },
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of your clients and deals
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Clients"
          value={totalClients}
          accentClassName="bg-blue-500"
        />

        <StatCard
          title="Active Deals"
          value={activeDeals}
          accentClassName="bg-amber-500"
        />

        <StatCard
          title="Won Revenue"
          value={wonRevenue}
          accentClassName="bg-emerald-500"
        />

        <StatCard
          title="Lead Clients"
          value={leads}
          accentClassName="bg-violet-500"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Deals by Stage
        </h2>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
              <span className="text-sm text-slate-600">Lead</span>
            </div>

            <span className="text-sm font-semibold text-slate-900">
              {dealsByStage.lead}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              <span className="text-sm text-slate-600">Proposal</span>
            </div>

            <span className="text-sm font-semibold text-slate-900">
              {dealsByStage.proposal}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="text-sm text-slate-600">Negotiation</span>
            </div>

            <span className="text-sm font-semibold text-slate-900">
              {dealsByStage.negotiation}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-sm text-slate-600">Won</span>
            </div>

            <span className="text-sm font-semibold text-slate-900">
              {dealsByStage.won}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="text-sm text-slate-600">Lost</span>
            </div>

            <span className="text-sm font-semibold text-slate-900">
              {dealsByStage.lost}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Latest Deals
          </h2>

          {latestDeals.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">No deals yet</p>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100">
              {latestDeals.map((deal) => (
                <li
                  key={deal.id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {deal.title}
                    </p>

                    <p className="mt-0.5 text-sm text-slate-500">
                      {deal.value}
                    </p>
                  </div>

                  <Badge
                    variant={deal.stage === 'lead' ? 'dealLead' : deal.stage}
                  >
                    {deal.stage}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Lead Clients
          </h2>

          {leadClients.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">No lead clients yet</p>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100">
              {leadClients.map((client) => (
                <li
                  key={client.id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {client.name}
                    </p>

                    <p className="mt-0.5 text-sm text-slate-500">
                      {client.company}
                    </p>
                  </div>
                  <Badge variant="lead">Lead</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

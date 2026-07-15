import { useSelector } from 'react-redux'

import type { RootState } from '@/app/store'

export const DashboardPage = () => {
  const clients = useSelector((state: RootState) => state.clients.items)
  const deals = useSelector((state: RootState) => state.deals.items)

  const totalClients = clients.length

  const activeDeals = deals.filter(
    (deal) => deal.stage !== 'won' && deal.stage !== 'lost',
  ).length

  const wonRevenue = deals
    .filter((deal) => deal.stage === 'won')
    .reduce((total, deal) => total + deal.value, 0)

  const newLeads = clients.filter((client) => client.status === 'lead').length

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <h2>Total Clients</h2>
        <p>{totalClients}</p>
      </div>

      <div>
        <h2>Active Deals</h2>
        <p>{activeDeals}</p>
      </div>

      <div>
        <h2>Won Revenue</h2>
        <p>{wonRevenue}</p>
      </div>

      <div>
        <h2>New Leads</h2>
        <p>{newLeads}</p>
      </div>
    </div>
  )
}

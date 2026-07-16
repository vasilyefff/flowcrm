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

  const leads = clients.filter((client) => client.status === 'lead').length

  const leadClients = clients.filter((client) => client.status === 'lead')

  const latestDeals = [...deals]
    .sort(
      (firstDeal, secondDeal) =>
        new Date(secondDeal.createdAt).getTime() -
        new Date(firstDeal.createdAt).getTime(),
    )
    .slice(0, 5)

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
        <h2>Leads</h2>
        <p>{leads}</p>
      </div>

      <div>
        <h2>Latest Deals</h2>

        {latestDeals.length === 0 ? (
          <p>No deals yet</p>
        ) : (
          <ul>
            {latestDeals.map((deal) => (
              <li key={deal.id}>
                {deal.title} — {deal.stage}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2>Lead Clients</h2>

        {leadClients.length === 0 ? (
          <p>No lead clients yet</p>
        ) : (
          <ul>
            {leadClients.map((client) => (
              <li key={client.id}>{client.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

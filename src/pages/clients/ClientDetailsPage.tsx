import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store/store'

export const ClientDetailsPage = () => {
  const { clientId } = useParams()
  const clients = useSelector((state: RootState) => state.clients.items)
  const client = clients.find((client) => client.id === clientId)

  const deals = useSelector((state: RootState) => state.deals.items)
  const clientDeals = deals.filter((deal) => deal.clientId === clientId)

  if (!client) {
    return <p>Client not found</p>
  }

  return (
    <div>
      <Link to="/clients">← Back to clients</Link>
      <h2>Client details</h2>
      <p>Name: {client.name}</p>
      <p>Email: {client.email}</p>
      <p>Phone: {client.phone}</p>
      <p>Company: {client.company}</p>
      <p>Status: {client.status}</p>
      <h3>Client deals</h3>
      <p>Total deals: {clientDeals.length}</p>
      {clientDeals.length === 0 ? (
        <p>This client has no deals yet.</p>
      ) : (
        clientDeals.map((deal) => (
          <div key={deal.id}>
            <p>Title: {deal.title}</p>
            <p>Value: {deal.value}</p>
            <p>Stage: {deal.stage}</p>
          </div>
        ))
      )}
    </div>
  )
}

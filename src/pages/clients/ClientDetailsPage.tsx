import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store/store'

export const ClientDetailsPage = () => {
  const { clientId } = useParams()
  const clients = useSelector((state: RootState) => state.clients.items)
  const client = clients.find((client) => client.id === clientId)

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
    </div>
  )
}

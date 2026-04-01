import { useSelector } from 'react-redux'

export const ClientsPage = () => {
  const clients = useSelector((state) => state.clients.clients)

  console.log(clients)

  return <div>Clients Page</div>
}

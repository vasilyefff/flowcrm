import { useSelector, useDispatch } from 'react-redux'
import { addClient } from '@/entities/client/model/clientSlice'
import { deleteClient } from '@/entities/client/model/clientSlice'

export const ClientsPage = () => {
  const clients = useSelector((state) => state.clients.clients)
  const dispatch = useDispatch()

  console.log(clients)

  const handleAdd = () => {
    dispatch(
      addClient({
        id: Date.now().toString(),
        name: 'Test',
        email: 'test@mail.com',
      }),
    )
  }

  const handleDelete = (id: string) => {
    dispatch(deleteClient(id))
  }

  return (
    <>
      <div>Clients Page</div>
      <button onClick={handleAdd}>Add client</button>

      {clients.length === 0 ? (
        <div>No clients yet</div>
      ) : (
        clients.map((client) => (
          <div key={client.id}>
            {client.name} — {client.email}
            <button onClick={() => handleDelete(client.id)}>Delete</button>
          </div>
        ))
      )}
    </>
  )
}

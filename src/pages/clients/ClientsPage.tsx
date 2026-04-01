import { useSelector, useDispatch } from 'react-redux'
import { addClient } from '@/entities/client/model/clientSlice'

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

  return (
    <>
      <div>Clients Page</div>
      <button onClick={handleAdd}>Add client</button>
    </>
  )
}

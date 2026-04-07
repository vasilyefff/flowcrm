import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addClient, deleteClient } from '@/entities/client/model/clientSlice'
import type { RootState } from '@/app/store'

export const ClientsPage = () => {
  const clients = useSelector((state: RootState) => state.clients.clients)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')

  const handleAdd = () => {
    if (!name || !email) {
      alert('Поля Name и Email обязательны')
      return
    }
    dispatch(
      addClient({
        name,
        email,
        phone,
        company,
      }),
    )
    setName('')
    setEmail('')
    setPhone('')
    setCompany('')
  }

  const handleDelete = (id: string) => {
    dispatch(deleteClient(id))
  }

  return (
    <>
      <div>Clients Page</div>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>
      <div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
      </div>
      <div>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
        />
      </div>
      <button onClick={handleAdd}>Add client</button>

      {clients.length === 0 ? (
        <div>No clients yet</div>
      ) : (
        clients.map((client) => (
          <div key={client.id}>
            {client.name} - {client.email} - {client.phone} - {client.company} -
            {client.status}
            <button onClick={() => handleDelete(client.id)}>Delete</button>
          </div>
        ))
      )}
    </>
  )
}

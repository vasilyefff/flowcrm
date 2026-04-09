import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addClient,
  deleteClient,
  updateClient,
} from '@/entities/client/model/clientSlice'
import type { RootState, AppDispatch } from '@/app/store'
import type { Client } from '@/entities/client/model/types'

export const ClientsPage = () => {
  const clients = useSelector((state: RootState) => state.clients.clients)
  const dispatch = useDispatch<AppDispatch>()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const [editClient, setEditClient] = useState<Client | null>(null)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editCompany, setEditCompany] = useState('')

  useEffect(() => {
    if (editClient) {
      setEditName(editClient.name)
      setEditEmail(editClient.email)
      setEditPhone(editClient.phone)
      setEditCompany(editClient.company)
    }
  }, [editClient])

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

  const handleUpdate = () => {
    if (!editClient) return

    dispatch(
      updateClient({
        ...editClient,
        name: editName,
        email: editEmail,
        phone: editPhone,
        company: editCompany,
      }),
    )

    setEditClient(null)
  }

  const filteredClients = clients.filter((client) => {
    const term = searchTerm.toLowerCase()
    return (
      client.name.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term)
    )
  })

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

      <div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search clients..."
        />
      </div>

      {editClient && (
        <div>
          <h3>Edit Client</h3>

          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Name"
          />
          <input
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
            placeholder="Phone"
          />
          <input
            value={editCompany}
            onChange={(e) => setEditCompany(e.target.value)}
            placeholder="Company"
          />

          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditClient(null)}>Cancel</button>
        </div>
      )}

      {filteredClients.length === 0 ? (
        <div>No clients found</div>
      ) : (
        filteredClients
          .filter((client) => !editClient || client.id !== editClient.id)
          .map((client) => (
            <div key={client.id}>
              {client.name} - {client.email} - {client.phone} - {client.company}{' '}
              -{client.status}
              <button onClick={() => handleDelete(client.id)}>Delete</button>
              <button onClick={() => setEditClient(client)}>Edit</button>
            </div>
          ))
      )}
    </>
  )
}

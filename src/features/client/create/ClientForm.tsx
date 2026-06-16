import { useState } from 'react'

import type {
  ClientStatus,
  CreateClientDto,
} from '@/entities/client/model/types'

type Props = {
  onSubmit: (data: CreateClientDto) => void
  onCancel?: () => void
  initialData?: CreateClientDto
  isEdit?: boolean
}

export const ClientForm = ({
  onSubmit,
  initialData,
  isEdit,
  onCancel,
}: Props) => {
  const [name, setName] = useState(initialData?.name || '')
  const [email, setEmail] = useState(initialData?.email || '')
  const [phone, setPhone] = useState(initialData?.phone || '')
  const [company, setCompany] = useState(initialData?.company || '')
  const [status, setStatus] = useState<ClientStatus>(
    initialData?.status || 'lead',
  )

  const handleAdd = () => {
    if (!name.trim() || !email.includes('@')) {
      alert('Enter valid name and email')
      return
    }

    onSubmit({
      name,
      email,
      phone,
      company,
      status,
    })

    setName('')
    setEmail('')
    setPhone('')
    setCompany('')
    setStatus('lead')
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3 style={{ marginBottom: 10 }}>
        {isEdit ? 'Edit Client' : 'Add Client'}
      </h3>

      <div style={{ marginBottom: 8 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ClientStatus)}
        >
          <option value="lead">Lead</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button onClick={handleAdd}>{isEdit ? 'Save' : 'Add client'}</button>
      {isEdit && (
        <button onClick={onCancel} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      )}
    </div>
  )
}

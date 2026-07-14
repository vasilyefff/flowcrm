import { useState } from 'react'

import type {
  ClientStatus,
  CreateClientDto,
  UpdateClientDto,
} from '@/entities/client/model/types'

type CreateClientFormProps = {
  onSubmit: (data: CreateClientDto) => void
  onCancel?: () => void
  initialData?: CreateClientDto
  isEdit?: false
}

type EditClientFormProps = {
  onSubmit: (data: UpdateClientDto) => void
  onCancel?: () => void
  initialData?: UpdateClientDto
  isEdit: true
}

type Props = CreateClientFormProps | EditClientFormProps

export const ClientForm = (props: Props) => {
  const { onSubmit, initialData, isEdit, onCancel } = props
  const [name, setName] = useState(initialData?.name || '')
  const [email, setEmail] = useState(initialData?.email || '')
  const [phone, setPhone] = useState(initialData?.phone || '')
  const [company, setCompany] = useState(initialData?.company || '')
  const [status, setStatus] = useState<ClientStatus>(
    initialData?.status || 'lead',
  )
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!name.trim() || !email.includes('@')) {
      setError('Enter valid name and email')
      return
    }
    const formData: CreateClientDto = {
      name,
      email,
      phone,
      company,
      status,
    }

    if (isEdit) {
      onSubmit(formData)
    } else {
      onSubmit(formData)
    }

    if (!isEdit) {
      setName('')
      setEmail('')
      setPhone('')
      setCompany('')
      setStatus('lead')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '420px',
        padding: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginTop: 20,
      }}
    >
      <h3 style={{ margin: 0 }}>{isEdit ? 'Edit Client' : 'Add Client'}</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="client-name">Name</label>
        <input
          id="client-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="client-email">Email</label>
        <input
          id="client-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="client-phone">Phone</label>
        <input
          id="client-phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="client-company">Company</label>
        <input
          id="client-company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="client-status">Status</label>
        <select
          id="client-status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ClientStatus)}
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          <option value="lead">Lead</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}

      <button
        onClick={handleSubmit}
        style={{
          padding: '8px 12px',
          border: '1px solid #222',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {isEdit ? 'Save' : 'Add client'}
      </button>

      {isEdit && (
        <button
          onClick={onCancel}
          style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      )}
    </div>
  )
}

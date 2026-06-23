import { useState, useEffect } from 'react'

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

  useEffect(() => {
    setName(initialData?.name || '')
    setEmail(initialData?.email || '')
    setPhone(initialData?.phone || '')
    setCompany(initialData?.company || '')
    setStatus(initialData?.status || 'lead')
    setError('')
  }, [initialData])

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

      {error && <p style={{ color: 'red', marginBottom: 8 }}>{error}</p>}

      <button onClick={handleSubmit}>{isEdit ? 'Save' : 'Add client'}</button>
      {isEdit && (
        <button onClick={onCancel} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      )}
    </div>
  )
}

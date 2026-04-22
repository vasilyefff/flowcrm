import { useState, useEffect } from 'react'

import type { CreateClientDto } from '@/entities/client/model/types'

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

  useEffect(() => {
    if (!initialData) return

    setName(initialData.name)
    setEmail(initialData.email)
    setPhone(initialData.phone)
    setCompany(initialData.company)
  }, [initialData])

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
    })

    setName('')
    setEmail('')
    setPhone('')
    setCompany('')
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

      <button onClick={handleAdd}>{isEdit ? 'Save' : 'Add client'}</button>
      {isEdit && (
        <button onClick={onCancel} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      )}
    </div>
  )
}

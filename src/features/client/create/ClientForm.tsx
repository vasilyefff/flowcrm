import { useState } from 'react'
import type { CreateClientDto } from '@/entities/client/model/types'

type Props = {
  onSubmit: (data: CreateClientDto) => void
}

export const ClientForm = ({ onSubmit }: Props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')

  const handleAdd = () => {
    if (!name.trim() || !email.trim()) return

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
      <h3 style={{ marginBottom: 10 }}>Add Client</h3>

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

      <button onClick={handleAdd}>Add client</button>
    </div>
  )
}

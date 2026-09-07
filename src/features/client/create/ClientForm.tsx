import { useState } from 'react'

import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import { Select } from '@/shared/ui/Select'

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

    onSubmit(formData)

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
      className={
        isEdit
          ? 'w-full space-y-4'
          : 'w-full max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm'
      }
    >
      <h3 className="text-lg font-semibold text-slate-900">
        {isEdit ? 'Edit Client' : 'Add Client'}
      </h3>

      <div className="space-y-1.5">
        <label
          htmlFor="client-name"
          className="text-sm font-medium text-slate-700"
        >
          Name
        </label>
        <Input
          id="client-name"
          className="w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="client-email"
          className="text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <Input
          id="client-email"
          className="w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="client-phone"
          className="text-sm font-medium text-slate-700"
        >
          Phone
        </label>
        <Input
          id="client-phone"
          className="w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="client-company"
          className="text-sm font-medium text-slate-700"
        >
          Company
        </label>
        <Input
          id="client-company"
          className="w-full"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="client-status"
          className="text-sm font-medium text-slate-700"
        >
          Status
        </label>
        <Select
          id="client-status"
          className="w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value as ClientStatus)}
        >
          <option value="lead">Lead</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      {isEdit ? (
        <div className="flex flex-col gap-3">
          <Button onClick={handleSubmit}>Save</Button>

          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button onClick={handleSubmit}>Add client</Button>
      )}
    </div>
  )
}

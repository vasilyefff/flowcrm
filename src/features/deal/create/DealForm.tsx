import { useState } from 'react'
import { useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import type { CreateDealDto, DealStage } from '@/entities/deal/model/types'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Select } from '@/shared/ui/Select'

type Props = {
  onSubmit: (data: CreateDealDto) => void
  initialData?: CreateDealDto
  isEdit?: boolean
  onCancel?: () => void
}

export const DealForm = ({
  onSubmit,
  initialData,
  isEdit,
  onCancel,
}: Props) => {
  const clients = useSelector((state: RootState) => state.clients.items)
  const [clientId, setClientId] = useState(initialData?.clientId || '')
  const [title, setTitle] = useState(initialData?.title || '')
  const [value, setValue] = useState(initialData?.value?.toString() || '')
  const [stage, setStage] = useState<DealStage>(initialData?.stage || 'lead')
  const [comment, setComment] = useState(initialData?.comment || '')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title.trim() || !clientId || !value.trim()) {
      setError('Enter deal title, client and value')
      return
    }

    const data: CreateDealDto = {
      title,
      clientId,
      value: Number(value),
      stage,
      comment,
    }

    onSubmit(data)
    setError('')

    setClientId('')
    setTitle('')
    setValue('')
    setStage('lead')
    setComment('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="deal-form"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '420px',
        padding: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <h2 style={{ margin: 0 }}>{isEdit ? 'Edit deal' : 'Create deal'}</h2>

      <div
        className="deal-form__field"
        style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <label htmlFor="deal-title">Deal title</label>
        <Input
          id="deal-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter deal title"
        />
      </div>

      <div
        className="deal-form__field"
        style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <label htmlFor="deal-client">Client</label>
        <Select
          id="deal-client"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        >
          <option value="">Select client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </Select>
      </div>

      <div
        className="deal-form__field"
        style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <label htmlFor="deal-value">Deal value</label>
        <Input
          id="deal-value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter deal value"
          type="number"
        />
      </div>

      <div
        className="deal-form__field"
        style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <label htmlFor="deal-stage">Stage</label>
        <Select
          id="deal-stage"
          value={stage}
          onChange={(e) => setStage(e.target.value as DealStage)}
        >
          <option value="lead">Lead</option>
          <option value="negotiation">Negotiation</option>
          <option value="proposal">Proposal</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </Select>
      </div>

      <div
        className="deal-form__field"
        style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <label htmlFor="deal-comment">Comment</label>
        <textarea
          id="deal-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a short comment"
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>

      {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}

      <Button type="submit" variant="primary">
        {isEdit ? 'Save changes' : 'Create deal'}
      </Button>

      {onCancel && (
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </form>
  )
}

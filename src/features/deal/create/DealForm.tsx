import { useState } from 'react'
import { useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import type { CreateDealDto, DealStage } from '@/entities/deal/model/types'

type Props = {
  onSubmit: (data: CreateDealDto) => void
}

export const DealForm = ({ onSubmit }: Props) => {
  const clients = useSelector((state: RootState) => state.clients.items)
  const [clientId, setClientId] = useState('')
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [stage, setStage] = useState<DealStage>('lead')
  const [comment, setComment] = useState('')
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
      <h2 style={{ margin: 0 }}>Create deal</h2>

      <div
        className="deal-form__field"
        style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <label htmlFor="deal-title">Deal title</label>
        <input
          id="deal-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter deal title"
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>

      <div
        className="deal-form__field"
        style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <label htmlFor="deal-client">Client</label>
        <select
          id="deal-client"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          <option value="">Select client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <div
        className="deal-form__field"
        style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <label htmlFor="deal-value">Deal value</label>
        <input
          id="deal-value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter deal value"
          type="number"
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>

      <div
        className="deal-form__field"
        style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <label htmlFor="deal-stage">Stage</label>
        <select
          id="deal-stage"
          value={stage}
          onChange={(e) => setStage(e.target.value as DealStage)}
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          <option value="lead">Lead</option>
          <option value="qualified">Qualified</option>
          <option value="proposal">Proposal</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
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

      <button
        type="submit"
        style={{
          padding: '8px 12px',
          border: '1px solid #222',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Create deal
      </button>
    </form>
  )
}

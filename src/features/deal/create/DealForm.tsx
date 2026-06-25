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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: CreateDealDto = {
      title,
      clientId,
      value: Number(value),
      stage,
      comment,
    }

    onSubmit(data)

    setClientId('')
    setTitle('')
    setValue('')
    setStage('lead')
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create deal</h2>

      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Deal title"
      />

      <select
        value={clientId}
        onChange={(event) => setClientId(event.target.value)}
      >
        <option value="">Select client</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Deal value"
        type="number"
      />

      <select
        value={stage}
        onChange={(event) => setStage(event.target.value as DealStage)}
      >
        <option value="lead">Lead</option>
        <option value="qualified">Qualified</option>
        <option value="proposal">Proposal</option>
        <option value="won">Won</option>
        <option value="lost">Lost</option>
      </select>

      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Deal comment"
      />

      <button type="submit">Create deal</button>
    </form>
  )
}

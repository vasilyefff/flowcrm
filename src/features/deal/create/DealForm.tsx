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
      className="flex max-w-md flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900">
        {isEdit ? 'Edit deal' : 'Create deal'}
      </h2>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="deal-title"
          className="text-sm font-medium text-slate-700"
        >
          Deal title
        </label>
        <Input
          id="deal-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter deal title"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="deal-client"
          className="text-sm font-medium text-slate-700"
        >
          Client
        </label>
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

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="deal-value"
          className="text-sm font-medium text-slate-700"
        >
          Deal value
        </label>
        <Input
          id="deal-value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter deal value"
          type="number"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="deal-stage"
          className="text-sm font-medium text-slate-700"
        >
          Stage
        </label>
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

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="deal-comment"
          className="text-sm font-medium text-slate-700"
        >
          Comment
        </label>
        <textarea
          id="deal-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a short comment"
          className="min-h-24 resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
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

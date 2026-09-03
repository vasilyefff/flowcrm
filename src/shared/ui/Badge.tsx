import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  variant?:
    | 'lead'
    | 'active'
    | 'inactive'
    | 'dealLead'
    | 'proposal'
    | 'negotiation'
    | 'won'
    | 'lost'
}

const variantClasses = {
  lead: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-700',

  dealLead: 'bg-violet-100 text-violet-700',
  proposal: 'bg-blue-100 text-blue-700',
  negotiation: 'bg-amber-100 text-amber-700',
  won: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700',
}

export const Badge = ({ children, variant = 'lead' }: Props) => {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  )
}

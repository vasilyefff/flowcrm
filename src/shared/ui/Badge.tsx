import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  variant?: 'lead' | 'active' | 'inactive'
}

const variantClasses = {
  lead: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-700',
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

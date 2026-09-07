import type { SelectHTMLAttributes } from 'react'

type Props = SelectHTMLAttributes<HTMLSelectElement>

export const Select = ({ className = '', ...props }: Props) => {
  return (
    <select
      {...props}
      className={`rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 ${className}`}
    />
  )
}

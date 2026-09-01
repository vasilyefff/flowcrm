import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
} & ButtonHTMLAttributes<HTMLButtonElement>

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

export const Button = ({ children, variant = 'primary', ...props }: Props) => {
  return (
    <button
      {...props}
      className={`rounded-md px-3 py-2 text-sm font-medium cursor-pointer ${variantClasses[variant]}`}
    >
      {children}
    </button>
  )
}

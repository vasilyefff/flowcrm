import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = (props: Props) => {
  return (
    <input
      {...props}
      className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
    />
  )
}

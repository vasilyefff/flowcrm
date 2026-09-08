type StatCardProps = {
  title: string
  value: string | number
  accentClassName?: string
}

export const StatCard = ({
  title,
  value,
  accentClassName = 'bg-slate-300',
}: StatCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${accentClassName}`} />
        <p className="text-sm font-medium text-slate-500">{title}</p>
      </div>

      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  )
}

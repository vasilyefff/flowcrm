import type { Deal } from '@/entities/deal/model/types'
import { Modal } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'

type Props = {
  isOpen: boolean
  deal: Deal | null
  onConfirm: () => void
  onCancel: () => void
}

export const DeleteDealDialog = ({
  isOpen,
  deal,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">Delete deal?</h3>

          <p className="text-sm leading-6 text-slate-500">
            {deal?.title
              ? `Are you sure you want to delete "${deal.title}"?`
              : 'Are you sure?'}
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="button" variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}

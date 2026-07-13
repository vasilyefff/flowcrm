import type { Deal } from '@/entities/deal/model/types'
import { Modal } from '@/shared/ui/Modal'

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
      <div>
        <h3>Delete deal?</h3>

        <p>
          {deal?.title
            ? `Are you sure you want to delete "${deal.title}"?`
            : 'Are you sure?'}
        </p>

        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <button type="button" onClick={onConfirm}>
            Delete
          </button>

          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

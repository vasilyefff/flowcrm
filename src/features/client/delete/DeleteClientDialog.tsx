import type { Client } from '@/entities/client/model/types'
import { Modal } from '@/shared/ui/Modal'

type Props = {
  isOpen: boolean
  client: Client | null
  onConfirm: () => void
  onCancel: () => void
}

export const DeleteClientDialog = ({
  isOpen,
  client,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div>
        <h3>Delete client?</h3>
        <p>
          {client?.name
            ? `Are you sure you want to delete ${client.name}?`
            : 'Are you sure?'}
        </p>

        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <button onClick={onConfirm}>Delete</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </Modal>
  )
}

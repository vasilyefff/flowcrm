import type { Client } from '@/entities/client/model/types'
import type { CreateClientDto } from '@/entities/client/model/types'
import { Modal } from '@/shared/ui/Modal'
import { ClientForm } from '../create/ClientForm'

type Props = {
  isOpen: boolean
  client: Client | null
  onSubmit: (data: CreateClientDto) => void
  onCancel: () => void
}

export const EditClientDialog = ({
  isOpen,
  client,
  onSubmit,
  onCancel,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <ClientForm
        onSubmit={onSubmit}
        initialData={client ?? undefined}
        isEdit
        onCancel={onCancel}
      />
    </Modal>
  )
}

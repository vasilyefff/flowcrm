import type { CreateDealDto, Deal } from '@/entities/deal/model/types'
import { DealForm } from '@/features/deal/create/DealForm'
import { Modal } from '@/shared/ui/Modal'

type Props = {
  deal: Deal | null
  onSubmit: (dealId: string, data: CreateDealDto) => void
  onCancel: () => void
}

export const EditDealDialog = ({ deal, onSubmit, onCancel }: Props) => {
  if (!deal) {
    return null
  }

  const handleSubmit = (data: CreateDealDto) => {
    onSubmit(deal.id, data)
  }

  return (
    <Modal isOpen={Boolean(deal)} onClose={onCancel}>
      <DealForm
        initialData={deal}
        isEdit
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </Modal>
  )
}

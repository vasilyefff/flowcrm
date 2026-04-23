import type { Client } from '@/entities/client/model/types'

type DeleteClientModalProps = {
  isOpen: boolean
  client: Client | null
  onConfirm: () => void
  onCancel: () => void
}

export const DeleteClientModal = ({
  isOpen,
  client,
  onConfirm,
  onCancel,
}: DeleteClientModalProps) => {
  if (!isOpen || !client) return null

  const overlayStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  }

  const modalStyle = {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '300px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  }

  const textStyle = {
    marginBottom: '16px',
    fontSize: '16px',
  }

  const actionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  }

  const confirmButtonStyle = {
    padding: '6px 12px',
    background: '#e53935',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }

  const cancelButtonStyle = {
    padding: '6px 12px',
    background: '#e0e0e0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <p style={textStyle}>
          Удалить клиента <b>{client.name}</b>?
        </p>

        <div style={actionsStyle}>
          <button style={cancelButtonStyle} onClick={onCancel}>
            Отмена
          </button>
          <button style={confirmButtonStyle} onClick={onConfirm}>
            Да, удалить
          </button>
        </div>
      </div>
    </div>
  )
}

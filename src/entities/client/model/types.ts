export type ClientStatus = 'lead' | 'active' | 'inactive'

export type Client = {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: ClientStatus
  createdAt: string
}

export type CreateClientDto = {
  name: string
  email: string
  phone: string
  company: string
}

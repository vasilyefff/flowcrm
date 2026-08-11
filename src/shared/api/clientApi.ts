import { api } from './api'
import type {
  Client,
  CreateClientDto,
  UpdateClientDto,
} from '@/entities/client/model/types'

export const getClients = async (): Promise<Client[]> => {
  const response = await api.get<Client[]>('/clients')

  return response.data
}

export const createClient = async (
  clientData: CreateClientDto,
): Promise<Client> => {
  const response = await api.post<Client>('/clients', clientData)

  return response.data
}

export const updateClient = async (
  id: string,
  clientData: UpdateClientDto,
): Promise<Client> => {
  const response = await api.patch<Client>(`/clients/${id}`, clientData)

  return response.data
}

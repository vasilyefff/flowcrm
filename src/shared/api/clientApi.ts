import { api } from './api'
import type { Client } from '../../entities/client/model/types'

export const getClients = async (): Promise<Client[]> => {
  const response = await api.get<Client[]>('/clients')

  return response.data
}

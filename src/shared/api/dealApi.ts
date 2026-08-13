import { api } from './api'
import type { Deal } from '@/entities/deal/model/types'

export const getDeals = async () => {
  const response = await api.get<Deal[]>('/deals')

  return response.data
}

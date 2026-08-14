import { api } from './api'
import type { Deal, CreateDealDto } from '@/entities/deal/model/types'

export const getDeals = async () => {
  const response = await api.get<Deal[]>('/deals')

  return response.data
}

export const createDeal = async (dealData: CreateDealDto) => {
  const response = await api.post<Deal>('/deals', dealData)

  return response.data
}

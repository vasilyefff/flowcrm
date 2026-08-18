import { api } from './api'
import type {
  Deal,
  CreateDealDto,
  UpdateDealDto,
} from '@/entities/deal/model/types'

export const getDeals = async () => {
  const response = await api.get<Deal[]>('/deals')

  return response.data
}

export const createDeal = async (dealData: CreateDealDto) => {
  const response = await api.post<Deal>('/deals', dealData)

  return response.data
}

export const updateDeal = async (id: string, dealData: UpdateDealDto) => {
  const response = await api.patch<Deal>(`/deals/${id}`, dealData)

  return response.data
}

export const deleteDeal = async (id: string) => {
  await api.delete(`/deals/${id}`)
}

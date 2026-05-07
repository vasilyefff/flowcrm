export type DealStage = 'lead' | 'qualified' | 'proposal' | 'won' | 'lost'

export type Deal = {
  id: string
  title: string
  clientId: string
  value: number
  stage: DealStage
  createdAt: string
  comment?: string
}

export type CreateDealDto = {
  title: string
  clientId: string
  value: number
  stage: DealStage
  comment?: string
}

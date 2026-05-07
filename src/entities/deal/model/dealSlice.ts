import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import type { Deal } from './types'
import type { CreateDealDto } from './types'

type DealsState = {
  items: Deal[]
}

const initialState: DealsState = {
  items: [],
}

const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    addDeal: (state, action: PayloadAction<CreateDealDto>) => {
      const newDeal: Deal = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      state.items.push(newDeal)
    },
  },
  deleteDeal: (state, action: PayloadAction<string>) => {
    state.items = state.items.filter((deal) => deal.id !== action.payload)
  },
})

export const { addDeal, deleteDeal } = dealsSlice.actions

export default dealsSlice.reducer

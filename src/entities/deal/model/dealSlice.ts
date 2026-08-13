import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Deal, CreateDealDto } from './types'
import { getDeals } from '@/shared/api/dealApi'

export const fetchDeals = createAsyncThunk<Deal[]>(
  'deals/fetchDeals',
  async () => {
    return getDeals()
  },
)

type DealsState = {
  items: Deal[]
  status: DealsStatus
  error: string | null
}

type DealsStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: DealsState = {
  items: [],
  status: 'idle',
  error: null,
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

    updateDeal: (state, action: PayloadAction<Deal>) => {
      state.items = state.items.map((deal) =>
        deal.id === action.payload.id ? action.payload : deal,
      )
    },

    deleteDeal: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((deal) => deal.id !== action.payload)
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDeals.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(fetchDeals.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.items = action.payload
    })

    builder.addCase(fetchDeals.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message ?? 'Failed to load deals'
    })
  },
})

export const { addDeal, updateDeal, deleteDeal } = dealsSlice.actions

export default dealsSlice.reducer

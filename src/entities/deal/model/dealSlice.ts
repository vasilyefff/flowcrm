import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Deal, CreateDealDto, UpdateDealDto } from './types'
import {
  createDeal,
  deleteDeal as deleteDealApi,
  getDeals,
  updateDeal as updateDealApi,
} from '@/shared/api/dealApi'

export const fetchDeals = createAsyncThunk<Deal[]>(
  'deals/fetchDeals',
  async () => {
    return getDeals()
  },
)

export const createDealRequest = createAsyncThunk<Deal, CreateDealDto>(
  'deals/createDeal',
  async (dealData) => {
    return createDeal(dealData)
  },
)

export const updateDealRequest = createAsyncThunk<
  Deal,
  { id: string; dealData: UpdateDealDto }
>('deals/updateDeal', async ({ id, dealData }) => {
  return updateDealApi(id, dealData)
})

export const deleteDealRequest = createAsyncThunk<string, string>(
  'deals/deleteDealRequest',
  async (id) => {
    await deleteDealApi(id)

    return id
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
  reducers: {},

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

    builder.addCase(createDealRequest.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(createDealRequest.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.items.push(action.payload)
    })
    builder.addCase(createDealRequest.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message ?? 'Failed to create deal'
    })

    builder.addCase(updateDealRequest.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(updateDealRequest.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.items = state.items.map((deal) =>
        deal.id === action.payload.id ? action.payload : deal,
      )
    })
    builder.addCase(updateDealRequest.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message ?? 'Failed to update deal'
    })

    builder.addCase(deleteDealRequest.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(deleteDealRequest.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.items = state.items.filter((deal) => deal.id !== action.payload)
    })
    builder.addCase(deleteDealRequest.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message ?? 'Failed to delete deal'
    })
  },
})

export default dealsSlice.reducer

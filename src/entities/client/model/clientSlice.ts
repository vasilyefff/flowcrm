import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

import { getClients } from '@/shared/api/clientApi'
import type { Client, CreateClientDto } from './types'

export const fetchClients = createAsyncThunk<Client[]>(
  'clients/fetchClients',
  async () => {
    return getClients()
  },
)

type ClientsStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type ClientsState = {
  items: Client[]
  status: ClientsStatus
  error: string | null
}

const initialState: ClientsState = {
  items: [],
  status: 'idle',
  error: null,
}

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addClient: (state, action: PayloadAction<CreateClientDto>) => {
      const newClient: Client = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      state.items.push(newClient)
    },
    deleteClient: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((client) => client.id !== action.payload)
    },
    updateClient: (state, action: PayloadAction<Client>) => {
      state.items = state.items.map((client) =>
        client.id === action.payload.id ? action.payload : client,
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClients.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.items = action.payload
    })

    builder.addCase(fetchClients.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message ?? 'Failed to load clients'
    })
  },
})

export const { addClient, deleteClient, updateClient } = clientsSlice.actions
export default clientsSlice.reducer

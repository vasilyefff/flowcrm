import axios from 'axios'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  createClient as createClientApi,
  getClients,
  updateClient as updateClientApi,
  deleteClient as deleteClientApi,
} from '@/shared/api/clientApi'

import type { Client, CreateClientDto, UpdateClientDto } from './types'

export const fetchClients = createAsyncThunk<Client[]>(
  'clients/fetchClients',
  async () => {
    return getClients()
  },
)

export const createClient = createAsyncThunk<Client, CreateClientDto>(
  'clients/createClient',
  async (clientData) => {
    return createClientApi(clientData)
  },
)

export const updateClientRequest = createAsyncThunk<
  Client,
  { id: string; clientData: UpdateClientDto }
>('clients/updateClient', async ({ id, clientData }) => {
  return updateClientApi(id, clientData)
})

export const deleteClientRequest = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('clients/deleteClient', async (id, { rejectWithValue }) => {
  try {
    await deleteClientApi(id)

    return id
  } catch (error) {
    if (axios.isAxiosError<{ message: string }>(error)) {
      return rejectWithValue(
        error.response?.data.message ?? 'Failed to delete client',
      )
    }

    return rejectWithValue('Failed to delete client')
  }
})

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
  reducers: {},

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

    builder.addCase(createClient.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.items.push(action.payload)
    })
    builder.addCase(createClient.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message ?? 'Failed to create client'
    })

    builder.addCase(updateClientRequest.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(updateClientRequest.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.items = state.items.map((client) =>
        client.id === action.payload.id ? action.payload : client,
      )
    })
    builder.addCase(updateClientRequest.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message ?? 'Failed to update client'
    })

    builder.addCase(deleteClientRequest.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(deleteClientRequest.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.items = state.items.filter((client) => client.id !== action.payload)
    })
    builder.addCase(deleteClientRequest.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload ?? 'Failed to delete client'
    })
  },
})

export default clientsSlice.reducer

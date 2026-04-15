import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Client } from './types'
import type { CreateClientDto } from './types'

type ClientsState = {
  items: Client[]
}

const initialState: ClientsState = {
  items: [],
}

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addClient: (state, action: PayloadAction<CreateClientDto>) => {
      const newClient: Client = {
        ...action.payload,
        id: Date.now().toString(),
        status: 'lead',
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
})

export const { addClient, deleteClient, updateClient } = clientsSlice.actions
export default clientsSlice.reducer

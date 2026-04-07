import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Client } from './types'
import type { CreateClientDto } from './types'

type ClientsState = {
  clients: Client[]
}

const initialState: ClientsState = {
  clients: [],
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
      state.clients.push(newClient)
    },
    deleteClient: (state, action: PayloadAction<string>) => {
      state.clients = state.clients.filter(
        (client) => client.id !== action.payload,
      )
    },
  },
})

export const { addClient, deleteClient } = clientsSlice.actions
export default clientsSlice.reducer

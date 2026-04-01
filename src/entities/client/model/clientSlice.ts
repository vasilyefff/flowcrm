import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Client } from './types'

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
    addClient: (state, action: PayloadAction<Client>) => {
      state.clients.push(action.payload)
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

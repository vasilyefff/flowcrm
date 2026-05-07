import { configureStore } from '@reduxjs/toolkit'
import clientsReducer from '@/entities/client/model/clientSlice'
import dealsReducer from '@/entities/deal/model/dealSlice'

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    deals: dealsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { configureStore } from '@reduxjs/toolkit'
import clientsReducer from '@/entities/client/model/clientSlice'

export const store = configureStore({
	reducer: {
		clients: clientsReducer
	}
})
import { Client } from './types'

type ClientsState = {
	clients: Client[]
}

const initialState: ClientsState = {
	clients: []
}
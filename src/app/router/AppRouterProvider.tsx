import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ClientsPage } from '@/pages/clients/ClientsPage'
import { DealsPage } from '@/pages/deals/DealsPage'

export const AppRouterProvider = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ClientsPage />} />
				<Route path="/clients" element={<ClientsPage />} />
				<Route path="/deals" element={<DealsPage />} />
			</Routes>
		</BrowserRouter >
	)
}
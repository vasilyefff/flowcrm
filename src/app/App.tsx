import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ClientsPage } from '@/pages/clients/ClientsPage'
import { DealsPage } from '@/pages/deals/DealsPage'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ClientsPage />} />
				<Route path="/clients" element={<ClientsPage />} />
				<Route path="/deals" element={<DealsPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
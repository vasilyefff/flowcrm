import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ClientsPage } from '@/pages/clients/ClientsPage'
import { ClientDetailsPage } from '@/pages/clients/ClientDetailsPage'
import { DealsPage } from '@/pages/deals/DealsPage'
import { AppLayout } from '../layout/AppLayout'

export const AppRouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<ClientsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/:clientId" element={<ClientDetailsPage />} />
          <Route path="/deals" element={<DealsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

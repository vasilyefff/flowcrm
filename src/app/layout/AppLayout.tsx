import { Outlet, Link } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <>
      <header>FlowCRM</header>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/clients">Clients</Link>
        <Link to="/deals">Deals</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

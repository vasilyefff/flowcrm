import { Outlet, NavLink } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white p-6">
        <header className="mb-8 text-xl font-bold">Dealora</header>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'rounded-lg bg-blue-50 px-3 py-2 font-semibold text-blue-600'
                : 'rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/clients"
            className={({ isActive }) =>
              isActive
                ? 'rounded-lg bg-blue-50 px-3 py-2 font-semibold text-blue-600'
                : 'rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100'
            }
          >
            Clients
          </NavLink>
          <NavLink
            to="/deals"
            className={({ isActive }) =>
              isActive
                ? 'rounded-lg bg-blue-50 px-3 py-2 font-semibold text-blue-600'
                : 'rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100'
            }
          >
            Deals
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}

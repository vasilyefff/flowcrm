import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className="flex min-h-screen bg-gray-100">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white p-6 transition-transform duration-200 md:static md:z-auto md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg text-2xl text-slate-600 hover:bg-slate-100 md:hidden"
        >
          ×
        </button>
        <header className="mb-6 text-sm font-bold md:mb-8 md:text-xl">
          Dealora
        </header>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/dashboard"
            onClick={() => setIsSidebarOpen(false)}
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
            onClick={() => setIsSidebarOpen(false)}
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
            onClick={() => setIsSidebarOpen(false)}
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
        <div className="sticky top-0 z-30 mb-4 bg-gray-100 py-2 md:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-2xl text-slate-700 hover:bg-slate-200"
          >
            ☰
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  )
}

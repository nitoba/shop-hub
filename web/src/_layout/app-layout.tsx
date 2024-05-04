import { Footer } from '@/components/footer'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <main className="flex h-full flex-col min-h-screen">
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}

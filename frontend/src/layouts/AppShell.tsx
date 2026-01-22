import type { PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'
import { TopNav } from '../components/TopNav'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div>
      <TopNav />
      <main>{children ?? <Outlet />}</main>
    </div>
  )
}


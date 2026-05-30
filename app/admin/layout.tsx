'use client'
import { ReactNode } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="adm-app">
      <AdminSidebar />
      <main className="adm-main">{children}</main>
    </div>
  )
}

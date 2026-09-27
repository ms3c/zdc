import { lazy, Suspense } from 'react'
import App from './App.tsx'

// The admin dashboard lives at /admin and is code-split so public visitors never download it.
const AdminApp = lazy(() => import('./admin/AdminApp.tsx'))

export default function Root() {
  if (!/^\/admin\/?$/.test(window.location.pathname)) return <App />
  return (
    <Suspense fallback={null}>
      <AdminApp />
    </Suspense>
  )
}

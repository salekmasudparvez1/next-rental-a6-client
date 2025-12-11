import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth_bg min-h-screen flex items-center justify-center bg-muted min-w-screen">
      {children}
    </div>
  )
}

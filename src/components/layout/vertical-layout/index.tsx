import type { ReactNode } from "react"

import { Footer } from "../footer"
import { Sidebar } from "../sidebar"
import { VerticalLayoutHeader } from "./vertical-layout-header"

export function VerticalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="w-full">
        <VerticalLayoutHeader />
        <main className="h-[calc(100svh-6.82rem)] overflow-y-auto bg-muted/40">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

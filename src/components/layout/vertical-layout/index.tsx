import type { ReactNode } from "react"

import { Footer } from "../footer"
import { Sidebar } from "../sidebar"
import { VerticalLayoutHeader } from "./vertical-layout-header"

export function VerticalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="w-full min-h-screen h-full flex flex-col justify-between items-between ">
        <VerticalLayoutHeader />
        <main  className="z-0 overflow-y-auto bg-muted/40">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className=" border-t border-sidebar-border bg-gray-200 shadow shadow-accent-foreground">
      <div className="container flex justify-between items-center p-4 md:px-6">
        <p className="text-xs text-muted-foreground md:text-sm">
          © {currentYear}{" "}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "link" }), "inline p-0")}
          >
            Find Basa
          </Link>
          .
        </p>
        <p className="text-xs text-muted-foreground md:text-sm">
          Designed & Developed by{" "}
          <Link
            href="https://github.com/salekmasudparvez1"
            target="_blank"
            rel="noopener noreferrer"
            className={`${cn(buttonVariants({ variant: "link" }), "inline p-0")}`}
          >
            Salek Masud Parvez
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}

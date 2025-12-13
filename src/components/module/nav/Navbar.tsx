"use client";
import React from "react";
import Link from "next/link";
import Logo from "../logo/Logo";
import { AuthButtonGroup } from "./AuthButtonGroup";
import { Navitems } from "./Navitems";
import { Avator } from "./Avator";
import { useUser } from "@/contexts/UseerContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Menu, X } from "lucide-react";
import { useMedia } from "react-use"
import { Button } from "@/components/ui/button";

const MOBILE_BREAKPOINT = 1024

export function useIsNavMobile() {
  const isMobile = useMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

  return isMobile
}

const Navbar = () => {

  const { user, isLoading } = useUser();
  const [open, setOpen] = React.useState(false);
  const isNavMobile = useIsNavMobile()

  const navMenus = [
    { name: "Home", path: "/" },
    { name: "Find Rentals", path: "/rentals" },
    { name: "About Us", path: "/about" },
  ]

  return (
    <>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[1130px] w-full nav_shadow flex z-50 items-center justify-between px-4 py-3 bg-white" >
        <div className="w-full flex items-center justify-between">
          {/* Mobile Menu Button */}
          {isNavMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              className="ml-2 relative"
            >
              {/* Menu Icon */}
              <Menu
                className={`h-7 w-7 absolute transition-all duration-300
        ${open ? "scale-0 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0"}
      `}
              />

              {/* X Icon */}
              <X
                className={`h-7 w-7 absolute transition-all duration-300
        ${open ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90"}
      `}
              />
            </Button>
          )}

          <Logo />

          {/* Desktop Navigation */}
          {!isNavMobile && <Navitems />}

          <div className="flex items-center gap-4">
            {isLoading ? (
              <Skeleton className="w-10 h-10 rounded-full" />
            ) : user ? (
              <Avator />
            ) : (
              <AuthButtonGroup />
            )}


          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isNavMobile && (
        <div
          className={`
      fixed top-16 left-0 right-0 z-40
      bg-white border-b border-slate-200 shadow-md
      transition-all duration-300 ease-in-out
      ${open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-3 pointer-events-none"}
    `}
        >
          <nav className="flex flex-col p-4 gap-2">
            {navMenus.map((menu, index) => (
              <Link
                key={index}
                href={menu.path}
                className="px-4 py-2 text-sm font-medium hover:bg-slate-100 rounded-md transition-colors"
                onClick={() => setOpen(false)}
              >
                {menu.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

    </>
  );

};

export default Navbar;
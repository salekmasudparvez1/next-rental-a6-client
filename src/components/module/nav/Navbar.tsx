"use client";
import React from "react";
import Logo from "../logo/Logo";
import { AuthButtonGroup } from "./AuthButtonGroup";
import { Navitems } from "./Navitems";
import { Avator } from "./Avator";
import { useUser } from "@/contexts/UseerContext";
import { Skeleton } from "@/components/ui/skeleton";



const Navbar = () => {

  const {user,isLoading}= useUser();

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[1130px] w-full nav_shadow flex z-50 items-center justify-between px-4 py-3 bg-white"  >
      <div className=" w-full flex items-center justify-between">
        <Logo />
        <Navitems />

        {isLoading ? (
          <Skeleton className="w-10 h-10 rounded-full" />
        ) : user ? (
          <Avator />
        ) : (
          <AuthButtonGroup />
        )}
      </div>
    </div>
  );

};

export default Navbar;
"use client";
import React from "react";
import Logo from "../logo/Logo";
import { AuthButtonGroup } from "./AuthButtonGroup";
import { Navitems } from "./Navitems";
import { Avator } from "./Avator";
import { useUser } from "@/contexts/UseerContext";



const Navbar = () => {

  const {user}= useUser()
 
  
  return (
    <div className="fixed top-0 nav_shadow flex z-50 items-center justify-between px-4 py-3 w-[1130px] rounded-t-none"  >
      <Logo />
      <Navitems />
      {!user && <AuthButtonGroup />}
      {user && <Avator/>}
    </div>
  );
};

export default Navbar;


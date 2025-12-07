"use client";
import React from "react";

import Logo from "../logo/Logo";
import { AuthButtonGroup } from "./AuthButtonGroup";
import { Navitems } from "./Navitems";
import { Avator } from "./Avator";



const Navbar = () => {
  const [loginedIn, setLoggedIn] = React.useState(true);
  
  return (
    <div className="fixed top-0 nav_shadow flex items-center justify-between px-4 py-3 w-[1130px] rounded-t-none"  >
      <Logo />
      <Navitems />
      {!loginedIn && <AuthButtonGroup />}
      {loginedIn && <Avator/>}
    </div>
  );
};

export default Navbar;


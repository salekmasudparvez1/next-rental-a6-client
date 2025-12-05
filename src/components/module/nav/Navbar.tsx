"use client";
import React from "react";

import Logo from "../logo/Logo";
import { AuthButtonGroup } from "./AuthButtonGroup";
import { Navitems } from "./Navitems";
import { Avator } from "./Avator";



const Navbar = () => {
  const [loginedIn, setLoggedIn] = React.useState(true);
  
  return (
    <div className="nav_shadow flex items-center justify-between px-4 py-3 rounded-sm">
      <Logo />
      <Navitems />
      {!loginedIn && <AuthButtonGroup />}
      {loginedIn && <Avator/>}
    </div>
  );
};

export default Navbar;


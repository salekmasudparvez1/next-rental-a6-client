"use client";

import * as React from "react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navitems() {
  const isMobile = useIsMobile();
  const navMenus=[
    {name:"Home", path:"/"},
    {name:"Find Rentals", path:"/rentals"},
    {name:"About Us", path:"/about"},
  ]

  return (
    <NavigationMenu className="bg-transparent w-fit" >
      <NavigationMenuList className="flex-wrap w-fit">
            {
              navMenus.map((menu,index)=>(
                <NavigationMenuItem key={index+1}>
                  <NavigationMenuLink
                    asChild
                    className={`${navigationMenuTriggerStyle()} bg-transparent`}
                  >
                    <Link href={menu.path}>{menu.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))
            }
      </NavigationMenuList>
    </NavigationMenu>
  );
}

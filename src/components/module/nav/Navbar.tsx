"use client";
import Image from "next/image";
import Link from "next/link"
import Logo from "@/assets/logo/logo.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/contexts/UseerContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { logout } from "@/service/auth/AuthService";
import toast from "react-hot-toast";




export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user,setUser } = useUser();
  const router = useRouter()
  const navMenus = [
    { name: "Home", path: "/" },
    { name: "Find Rentals", path: "/rentals" },
    { name: "About Us", path: "/about" },
  ];
  
    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
            toast.success("Logged out successfully");
          
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "Logout failed");
        } finally {
              router.push("/auth/login");
        }
    };

  return (

    <nav className="fixed top-0 z-50 w-full h-16 bg-gray-200 shadow shadow-accent-foreground">
      <div className="mx-auto flex h-full max-w-[1130px] items-center justify-between px-4">
        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex items-center justify-center rounded-md border border-neutral-300 p-2"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Image src={Logo} alt="FindBasa" width={100} height={40} />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {navMenus.map((menu) => (
            <Link
              key={menu.path}
              href={menu.path}
              className="group relative inline-flex h-8 items-center font-light italic justify-center overflow-hidden  border-b border-neutral-200 bg-transparent px-3 text-neutral-600 transition-all
              hover:[box-shadow:0px_2px_rgb(82_82_82)]  duration-500"
            >
              {menu.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        {user ?
          <div>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full p-2" variant="outline">
                  <Avatar>
                    <AvatarImage src={user?.photoURL} />
                    <AvatarFallback>{user?.userName}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>@{user.userName}</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Button onClick={()=>router.push('/profile')} variant="outline">
                      Profile
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button onClick={()=>router.push(`/${user?.role}`)} variant="outline">
                      Dashoard
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button onClick={()=>handleLogout()} variant="outline">
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuGroup >


              </DropdownMenuContent>
            </DropdownMenu>

          </div>

          : <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-3 font-medium text-neutral-600 transition-all duration-100
            [box-shadow:5px_5px_rgb(82_82_82)]
            hover:translate-x-[3px] hover:translate-y-[3px]
            hover:[box-shadow:0px_0px_rgb(82_82_82)]"
            >
              Login
            </Link>

            <Link
              href="/auth/register"
              className="group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-3 font-medium text-neutral-600 transition-all duration-100
            [box-shadow:5px_5px_rgb(82_82_82)]
            hover:translate-x-[3px] hover:translate-y-[3px]
            hover:[box-shadow:0px_0px_rgb(82_82_82)]"
            >
              Register
            </Link>
          </div>
        }

        
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden bg-gray-200 transition-all duration-300
        ${open ? "max-h-96 border-t" : "max-h-0"}`}
      >
        <div className="flex flex-col gap-4 p-4">
          {navMenus.map((menu) => (
            <Link
              key={menu.path}
              href={menu.path}
              onClick={() => setOpen(false)}
              className="group inline-flex h-9 items-center justify-center rounded-md border border-neutral-200 px-3 font-medium text-neutral-600 transition-all duration-100
              [box-shadow:5px_5px_rgb(82_82_82)]
              hover:translate-x-[3px] hover:translate-y-[3px]
              hover:[box-shadow:0px_0px_rgb(82_82_82)]"
            >
              {menu.name}
            </Link>
          ))}

          {!user &&
            <>
              <Link
                href="/auth/login"
                className="group inline-flex h-9 items-center justify-center rounded-md border border-neutral-200 px-3 font-medium text-neutral-600 transition-all duration-100
            [box-shadow:5px_5px_rgb(82_82_82)]
            hover:translate-x-[3px] hover:translate-y-[3px]
            hover:[box-shadow:0px_0px_rgb(82_82_82)]"
              >
                Login
              </Link>

              <Link
                href="/auth/register"
                className="group inline-flex h-9 items-center justify-center rounded-md border border-neutral-200 px-3 font-medium text-neutral-600 transition-all duration-100
            [box-shadow:5px_5px_rgb(82_82_82)]
            hover:translate-x-[3px] hover:translate-y-[3px]
            hover:[box-shadow:0px_0px_rgb(82_82_82)]"
              >
                Register
              </Link>
            </>
          }
        </div>
      </div>
    </nav >
  )
}



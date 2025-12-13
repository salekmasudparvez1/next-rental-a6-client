"use client"

import Link from "next/link"
import { LogOut, User, UserCog } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import { getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { getProfileData } from "@/service/profile/profileService/Index"
import { logout } from "@/service/auth/AuthService"
import { useUser } from "@/contexts/UseerContext"

type Profile = {
  photoURL?: string
  username?: string
  email?: string
}

export function UserDropdown() {
  const router = useRouter()
  const { setIsLoading, setUser } = useUser()
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileData()
        setProfile(res?.data ?? null)
      } catch {
        toast.error("Failed to load profile")
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await logout()
      setUser(null)
      toast.success("Logged out successfully")
      router.push("/auth/login")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Logout failed"
      )
    } finally {
      setIsLoading(false)
    }
  }

  const { photoURL, username, email } = profile || {}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-lg">
          <Avatar className="size-9">
            <AvatarImage src={photoURL} alt={username} />
            <AvatarFallback>
              {username && getInitials(username)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuLabel className="flex gap-2">
          <Avatar>
            <AvatarImage src={photoURL} alt={username} />
            <AvatarFallback>
              {username && getInitials(username)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-medium truncate">{username}</p>
            <p className="text-xs text-muted-foreground truncate">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="me-2 size-4" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/settings">
              <UserCog className="me-2 size-4" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="me-2 size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

"use client"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut, FileText } from "lucide-react"
import { logout } from "@/service/auth/AuthService"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UseerContext"
import toast from "react-hot-toast"

export function Avator() {
    const router = useRouter();
    const { user, setUser ,setIsLoading} = useUser();
    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await logout();
            setUser(null); // Clear user from context
            router.push("/auth/login"); // Redirect to login
            toast.success("Logged out successfully");
        } catch (error :unknown) {
            toast.error(error instanceof Error ? error.message : "Logout failed");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="p-0 rounded-full">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push(`${user?.role}`)}>
                        <FileText className="mr-2 h-4 w-4" />

                        <span>Dashboard</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

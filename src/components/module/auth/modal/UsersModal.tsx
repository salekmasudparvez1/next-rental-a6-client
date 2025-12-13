"use client"

import { useState } from "react"
import { CheckCircle, Clock, Crown, Edit, Mail, MoreHorizontal, Phone, ShieldCheck, Trash, User, View, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { IUserForTable } from "@/types/user"
import { Badge } from "@/components/ui/badge"

import type { LucideIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function InfoRow({
    icon: Icon,
    label,
    value,
}: {
    icon: LucideIcon
    label: string
    value?: string
}) {
    return (
        <div className="flex items-center gap-3 rounded-md border px-3 py-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 text-sm">
                <p className="text-muted-foreground">{label}</p>
                <p className="font-medium">{value || "-"}</p>
            </div>
        </div>
    )
}


interface Props {
    user: IUserForTable
    onUpdate: (updatedUser: IUserForTable) => void
    onDelete: (id: string) => void
}

export function UserRowActions({ user, onUpdate, onDelete }: Props) {
    const [showView, setShowView] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [form, setForm] = useState(user)

    const handleChange = (field: keyof IUserForTable, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = () => {
        onUpdate(form)
        setShowEdit(false)
    }

    return (
        <>
            {/* Dropdown Menu */}
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon-sm" aria-label="Open menu">
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onSelect={() => setShowView(true)}><View /> View</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setShowEdit(true)}><Edit />Edit</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setShowDelete(true)} className="text-red-600">
                        <Trash /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* View Dialog */}
            <Dialog open={showView} onOpenChange={setShowView}>
                <DialogContent className="sm:max-w-md">
                    {/* Header */}
                    <DialogHeader className="flex flex-col items-center justify-center gap-3 border-b pb-4">
                        <Image
                            width={64}
                            height={64}
                            src={user?.photoURL}
                            alt={user?.username}
                            className="rounded-full object-cover mx-auto"
                        />

                        <div className="text-center space-y-1">
                            <DialogTitle className="text-lg font-semibold flex items-center justify-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                {user?.username}
                            </DialogTitle>
                            <DialogDescription>@{user?.username}</DialogDescription>
                        </div>

                        {/* Badges */}
                        <div className="flex gap-2">
                            Plan:
                            <Badge variant="secondary" className={`${user?.subscriptionPlan === "free" ? "bg-red-500 text-white dark:bg-green-600" : "bg-[#FFD700] text-black dark:bg-gray-600"} flex items-center gap-1`}>
                                <Crown className="h-3 w-3" />
                                {user?.subscriptionPlan}
                            </Badge>
                            Status:

                            <Badge
                                variant={
                                    user?.status === "approved"
                                        ? "default"
                                        : user?.status === "pending"
                                            ? "secondary"
                                            : "destructive"
                                }
                                className={`${user?.status === "approved"
                                    ? "bg-blue-500 text-white dark:bg-blue-600"
                                    : user?.status === "pending"
                                        ? "bg-yellow-500 text-white dark:bg-yellow-600"
                                        : "bg-red-500 text-white dark:bg-red-600"
                                    } flex items-center gap-1 capitalize`}
                            >
                                {user?.status === "approved" ? (
                                    <CheckCircle className="h-3 w-3" />
                                ) : user?.status === "pending" ? (
                                    <Clock className="h-3 w-3" />
                                ) : (
                                    <XCircle className="h-3 w-3" />
                                )}
                                {user?.status}
                            </Badge>
                        </div>
                    </DialogHeader>

                    {/* Body */}
                    <div className="space-y-3 pt-4">
                        <InfoRow icon={ShieldCheck} label="Role" value={user?.role} />
                        <InfoRow icon={Mail} label="Email" value={user?.email} />
                        <InfoRow icon={Phone} label="Phone" value={user?.phoneNumber} />
                    </div>

                    {/* Footer */}
                    <DialogFooter className="pt-4">
                        <DialogClose asChild>
                            <Button variant="outline" className="w-full">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={showEdit} onOpenChange={setShowEdit}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Edit the details of <b>{user.username}</b>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Username */}
                        <div className="space-y-1">
                            <Label>Username</Label>
                            <Input
                                value={form.username}
                                onChange={(e) => handleChange("username", e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                            <Label>Phone Number</Label>
                            <Input
                                value={form.phoneNumber}
                                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                            />
                        </div>

                        <div className="flex  justify-between items-center flex-wrap">
                            {/* Role */}
                            <div className="space-y-1">
                                <Label>Role</Label>
                                <Select
                                    value={form.role}
                                    onValueChange={(value) => handleChange("role", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>

                                        <SelectItem value="landlord">Landlord</SelectItem>
                                        <SelectItem value="tenant">Tenant</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Status */}
                            <div className="space-y-1">
                                <Label>Status</Label>
                                <Select
                                    value={form.status}
                                    onValueChange={(value) => handleChange("status", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending" className="text-yellow-600">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-yellow-600" />
                                                Pending
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="approved" className="text-green-600">
                                            <div className="flex items-center font-bold gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                                Approved
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="rejected" className="text-red-600">
                                            <div className="flex font-bold items-center gap-2">
                                                <XCircle className="h-4 w-4 text-red-600" />
                                                Rejected
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Subscription */}
                            <div className="space-y-1">
                                <Label>Subscription Plan</Label>
                                <Select
                                    value={form.subscriptionPlan}
                                    onValueChange={(value) =>
                                        handleChange("subscriptionPlan", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select plan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="free" className="text-red-600">
                                            <div className="flex items-center gap-2">
                                                <Crown className="h-4 w-4 text-red-600" />
                                                Free
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="premium" className="text-yellow-600">
                                            <div className="flex items-center gap-2">
                                                <Crown className="h-4 w-4 text-yellow-600" />
                                                Premium
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <Label>Password (optional)</Label>
                            <Input
                                type="password"
                                value={form.password || ""}
                                onChange={(e) => handleChange("password", e.target.value)}
                            />
                        </div>

                        {/* Flags */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={form.isBlocked}
                                    onCheckedChange={(v) => handleChange("isBlocked", !!v)}
                                />
                                <Label>Blocked</Label>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={form.isActive}
                                    onCheckedChange={(v) => handleChange("isActive", !!v)}
                                />
                                <Label>Active</Label>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDelete} onOpenChange={setShowDelete}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">
                            Delete User
                        </DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. Please confirm you want to delete this user.
                        </DialogDescription>
                    </DialogHeader>

                    {/* User Info */}
                    <div className="flex items-center gap-4 rounded-md border p-3">
                        <Image
                            src={user.photoURL}
                            alt={user.username}
                            width={48}
                            height={48}
                            className="rounded-full"
                        />

                        <div className="space-y-0.5">
                            <p className="font-medium">{user.username}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-sm text-muted-foreground">
                                {user.phoneNumber || "No phone number"}
                            </p>
                        </div>
                    </div>

                    {/* Warning */}
                    <p className="text-sm text-destructive font-medium">
                        Are you sure you want to permanently delete this user?
                    </p>

                    <DialogFooter className="flex justify-between">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>

                        <Button
                            variant="destructive"
                            onClick={() => {
                                onDelete(user._id)
                                setShowDelete(false)
                            }}
                        >
                            Delete User
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}

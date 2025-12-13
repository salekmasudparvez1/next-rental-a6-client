"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon, ClockIcon, XCircleIcon } from "lucide-react";

type ProfileCardProps = {
  photoURL: string;
  username: string;
  role: string;
  status: "approved" | "pending" | "rejected";
  email: string;
  phoneNumber: string;
  subscriptionPlan?: string;
};

const statusConfig = {
  approved: { color: "bg-blue-500 dark:bg-blue-600", label: "Verified", icon: <BadgeCheckIcon className="w-4 h-4" /> },
  pending: { color: "bg-yellow-500 dark:bg-yellow-600", label: "Pending", icon: <ClockIcon className="w-4 h-4" /> },
  rejected: { color: "bg-red-500 dark:bg-red-600", label: "Rejected", icon: <XCircleIcon className="w-4 h-4" /> },
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  photoURL,
  username,
  role,
  status,
  email,
  phoneNumber,
  subscriptionPlan,
}) => {
  const currentStatus = statusConfig[status];

  return (
    <Card className="relative p-6 shadow-md border border-slate-200 w-full max-w-sm mx-auto">
      {/* Status Badge */}
      {currentStatus && (
        <Badge
          variant="secondary"
          className={`absolute top-4 right-4 text-white flex items-center gap-1 ${currentStatus.color}`}
        >
          {currentStatus.icon}
          {currentStatus.label}
        </Badge>
      )}

      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={photoURL} alt={username} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        {/* Name and Role */}
        <h2 className="text-xl font-bold">@{username}</h2>
        <p className="text-sm text-gray-500 border px-2 py-1 rounded-full my-2">Role: {role}</p>

        {/* Subscription */}
        {subscriptionPlan && (
          <Badge
            variant="secondary"
            className="bg-purple-500 text-white dark:bg-purple-600 flex items-center gap-1 my-2"
          >
            {subscriptionPlan}
          </Badge>
        )}

        {/* Stats */}
        <div className="flex justify-around w-full mt-4 bg-slate-100 rounded-lg p-3">
          <div>
            <p className="text-lg font-bold text-gray-800">184</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">32</p>
            <p className="text-xs text-gray-500">Projects</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">4.5K</p>
            <p className="text-xs text-gray-500">Members</p>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-6 space-y-2 text-gray-600 text-sm">
          <p>✉️ {email}</p>
          <p>📞 {phoneNumber}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;

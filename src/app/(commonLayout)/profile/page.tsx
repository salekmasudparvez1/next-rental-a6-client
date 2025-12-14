import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProfileData } from "../../../service/profile/profileService/Index";
import ProfileCard from "@/components/module/profile/ProfileCard";
import { redirect } from "next/navigation";


export default async function ProfilePage() {
    const data = await getProfileData();
    // If no auth token or no data, redirect to login
    if (!data || !data?.data) {
        redirect("/auth/login");
    }

    const { username, role, status, email, photoURL, phoneNumber, subscriptionPlan } = data.data;
    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                 <ProfileCard 
                    photoURL={photoURL}
                    username={username}
                    role={role}
                    status={status}
                    email={email}
                    phoneNumber={phoneNumber}
                    subscriptionPlan={subscriptionPlan}
                  />

                {/* Latest Activity */}
                <Card className="md:col-span-2 shadow-md border border-slate-200">
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle>Latest Activity</CardTitle>
                        <Button variant="link" size="sm">View All</Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Activity Item */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">
                                📦
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Shadcn UI Kit Application UI v2.0.0 <span className="text-xs text-gray-400 ml-2">Latest</span></p>
                                <p className="text-xs text-gray-400">Released on December 2nd, 2025</p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.
                                </p>
                                <Button size="sm" className="mt-1">Download ZIP</Button>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">
                                🎨
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Shadcn UI Kit Figma v1.3.0</p>
                                <p className="text-xs text-gray-400">Released on December 2nd, 2025</p>
                                <p className="text-sm text-gray-600 mt-1">
                                    All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">
                                📚
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Shadcn UI Kit Library v1.2.2</p>
                                <p className="text-xs text-gray-400">Released on December 2nd, 2025</p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Get started with dozens of web components and interactive elements built on top of Tailwind CSS.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

